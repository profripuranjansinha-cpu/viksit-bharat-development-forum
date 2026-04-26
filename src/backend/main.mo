import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import List "mo:core/List";
import Random "mo:core/Random";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module MemberRole {
    public type MemberRole = {
      #policy_maker;
      #entrepreneur;
      #youth;
      #civil_society;
      #other;
    };

    public func compare(role1 : MemberRole, role2 : MemberRole) : Order.Order {
      switch (role1, role2) {
        case (#policy_maker, #policy_maker) { #equal };
        case (#policy_maker, _) { #less };
        case (#entrepreneur, #policy_maker) { #greater };
        case (#entrepreneur, #entrepreneur) { #equal };
        case (#entrepreneur, _) { #less };
        case (#youth, #youth) { #equal };
        case (#youth, _) { #less };
        case (#civil_society, #civil_society) { #equal };
        case (#civil_society, _) { #greater };
        case (#other, #other) { #equal };
        case (#other, _) { #greater };
      };
    };
  };

  type MemberRole = MemberRole.MemberRole;

  // Types
  type MemberId = Nat;
  type NewsId = Nat;
  type ContactMessageId = Nat;

  type Member = {
    id : MemberId;
    name : Text;
    email : Text;
    role : MemberRole;
    organization : Text;
    state : Text;
    message : Text;
  };

  type NewsItem = {
    id : NewsId;
    title : Text;
    date : Time.Time;
    summary : Text;
    category : Text;
  };

  type ContactMessage = {
    id : ContactMessageId;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    organization : Text;
  };

  // State
  let members = Map.empty<MemberId, Member>();
  let newsItems = Map.empty<NewsId, NewsItem>();
  let contactMessages = Map.empty<ContactMessageId, ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextMemberId = 1;
  var nextNewsId = 1;
  var nextContactMessageId = 1;

  // Access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile functions (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Member functions
  // Public function - anyone including guests can register
  public shared ({ caller }) func registerMember(name : Text, email : Text, role : MemberRole, organization : Text, state : Text, message : Text) : async MemberId {
    let memberId = nextMemberId;
    let member : Member = {
      id = memberId;
      name;
      email;
      role;
      organization;
      state;
      message;
    };
    members.add(memberId, member);
    nextMemberId += 1;
    memberId;
  };

  // Admin only
  public query ({ caller }) func getAllMembers() : async [Member] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access member data");
    };
    members.values().toArray();
  };

  // News functions
  // Admin only
  public shared ({ caller }) func createNewsItem(title : Text, date : Time.Time, summary : Text, category : Text) : async NewsId {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create news items");
    };
    let newsId = nextNewsId;
    let newsItem : NewsItem = {
      id = newsId;
      title;
      date;
      summary;
      category;
    };
    newsItems.add(newsId, newsItem);
    nextNewsId += 1;
    newsId;
  };

  // Public - anyone can view news
  public query ({ caller }) func getAllNewsItems() : async [NewsItem] {
    newsItems.values().toArray();
  };

  // Contact functions
  // Public - anyone including guests can submit contact messages
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, subject : Text, message : Text) : async ContactMessageId {
    let messageId = nextContactMessageId;
    let contactMessage : ContactMessage = {
      id = messageId;
      name;
      email;
      subject;
      message;
    };
    contactMessages.add(messageId, contactMessage);
    nextContactMessageId += 1;
    messageId;
  };

  // Admin only
  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can access contact messages");
    };
    contactMessages.values().toArray();
  };

  // Statistics
  // Public - anyone can view statistics
  public query ({ caller }) func getForumStatistics() : async {
    totalMembers : Nat;
    policyMakers : Nat;
    entrepreneurs : Nat;
    youth : Nat;
    civilSociety : Nat;
    other : Nat;
  } {
    var policyMakers = 0;
    var entrepreneurs = 0;
    var youth = 0;
    var civilSociety = 0;
    var other = 0;

    members.values().forEach(
      func(member) {
        switch (member.role) {
          case (#policy_maker) { policyMakers += 1 };
          case (#entrepreneur) { entrepreneurs += 1 };
          case (#youth) { youth += 1 };
          case (#civil_society) { civilSociety += 1 };
          case (#other) { other += 1 };
        };
      }
    );

    {
      totalMembers = members.size();
      policyMakers;
      entrepreneurs;
      youth;
      civilSociety;
      other;
    };
  };
};
