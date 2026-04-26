import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ContactMessageId = bigint;
export type Time = bigint;
export type NewsId = bigint;
export interface ContactMessage {
    id: ContactMessageId;
    subject: string;
    name: string;
    email: string;
    message: string;
}
export type MemberId = bigint;
export interface Member {
    id: MemberId;
    name: string;
    role: MemberRole;
    email: string;
    state: string;
    message: string;
    organization: string;
}
export interface NewsItem {
    id: NewsId;
    title: string;
    date: Time;
    summary: string;
    category: string;
}
export interface UserProfile {
    name: string;
    email: string;
    organization: string;
}
export enum MemberRole {
    policy_maker = "policy_maker",
    entrepreneur = "entrepreneur",
    other = "other",
    civil_society = "civil_society",
    youth = "youth"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createNewsItem(title: string, date: Time, summary: string, category: string): Promise<NewsId>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllMembers(): Promise<Array<Member>>;
    getAllNewsItems(): Promise<Array<NewsItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getForumStatistics(): Promise<{
        other: bigint;
        entrepreneurs: bigint;
        civilSociety: bigint;
        totalMembers: bigint;
        youth: bigint;
        policyMakers: bigint;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerMember(name: string, email: string, role: MemberRole, organization: string, state: string, message: string): Promise<MemberId>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactMessage(name: string, email: string, subject: string, message: string): Promise<ContactMessageId>;
}
