import { useQuery } from "@tanstack/react-query";
import { getMyTeams } from "@/features/teams/api/teams";

export function useTeams() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams", "mine"],
    queryFn: getMyTeams,
  });

  return {
    teams: data ?? [],
    isLoading,
    isError,
  };
}
