import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { removeMember } from "@/features/teams/api/teams";

export function useRemoveMember(teamId: string) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (memberUserId: string) => removeMember(teamId, memberUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams", teamId, "members"] });
      toast.success(t("teams.memberRemoved"));
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
  };
}
