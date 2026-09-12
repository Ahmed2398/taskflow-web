import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { useTeams } from "@/features/teams/hooks/useTeams";
import { useCreateTeam } from "@/features/teams/hooks/useCreateTeam";
import { TeamList } from "@/features/teams/components/TeamList";
import { CreateTeamDialog } from "@/features/teams/components/CreateTeamDialog";
import { Button } from "@/shared/ui/button";

export function TeamsPage() {
  const { t } = useTranslation();
  const { teams, isLoading } = useTeams();
  const { submit, isPending } = useCreateTeam();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{t("teams.title")}</h1>
          <p className="text-muted-foreground">{t("teams.titleDescription")}</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("teams.createTeam")}
        </Button>
      </div>

      <TeamList teams={teams} isLoading={isLoading} />

      <CreateTeamDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={submit}
        isSubmitting={isPending}
      />
    </div>
  );
}
