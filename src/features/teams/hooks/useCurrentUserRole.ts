import { useAuth } from "@/shared/hooks/useAuth";
import { useTeamMembers } from "@/features/teams/hooks/useTeamMembers";
import type { MemberRole } from "@/features/teams/api/teams";

export function useCurrentUserRole(teamId: string | undefined) {
  const { user } = useAuth();
  const { members, isLoading } = useTeamMembers(teamId);

  if (!user || !members.length) {
    return { role: null as MemberRole | null, isLoading };
  }

  const membership = members.find((m) => m.user.id === user.id);
  return { role: membership?.role ?? null, isLoading };
}
