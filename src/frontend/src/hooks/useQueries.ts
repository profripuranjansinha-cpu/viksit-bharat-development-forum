import { useMutation, useQuery } from "@tanstack/react-query";
import type { MemberRole } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllNewsItems() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["newsItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNewsItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetForumStatistics() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["forumStatistics"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getForumStatistics();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterMember() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      role: MemberRole;
      organization: string;
      state: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerMember(
        data.name,
        data.email,
        data.role,
        data.organization,
        data.state,
        data.message,
      );
    },
  });
}

export function useSubmitContactMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(
        data.name,
        data.email,
        data.subject,
        data.message,
      );
    },
  });
}
