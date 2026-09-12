import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "@/features/teams/api/teams";

export function useTeamMembers(teamId: string | undefined) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams", teamId, "members"],
    queryFn: () => getTeamMembers(teamId!),
    enabled: !!teamId,
  });

  return {
    members: data ?? [],
    isLoading,
    isError,
  };
}
