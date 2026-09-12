import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { createTeam } from "@/features/teams/api/teams";
import { ROUTES } from "@/shared/constants";

export function useCreateTeam() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (name: string) => createTeam(name),
    onSuccess: (team) => {
      queryClient.invalidateQueries({ queryKey: ["teams", "mine"] });
      toast.success(t("teams.teamCreated"));
      navigate(`${ROUTES.teams}/${team.id}`);
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
