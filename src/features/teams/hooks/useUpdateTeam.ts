import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { updateTeam } from "@/features/teams/api/teams";

export function useUpdateTeam(teamId: string) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (name: string) => updateTeam(teamId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams", "mine"] });
      queryClient.invalidateQueries({ queryKey: ["teams", teamId, "members"] });
      toast.success(t("teams.teamUpdated"));
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
