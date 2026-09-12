import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { deleteTeam } from "@/features/teams/api/teams";
import { ROUTES } from "@/shared/constants";

export function useDeleteTeam(teamId: string) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: () => deleteTeam(teamId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams", "mine"] });
      toast.success(t("teams.teamDeleted"));
      navigate(ROUTES.teams);
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
