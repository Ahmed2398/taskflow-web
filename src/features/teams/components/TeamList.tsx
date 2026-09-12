import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { CardSkeleton } from "@/shared/components/skeletons";
import type { Team } from "@/features/teams/api/teams";

interface TeamListProps {
  teams: Team[];
  isLoading: boolean;
}

export function TeamList({ teams, isLoading }: TeamListProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <Users className="h-12 w-12 text-muted-foreground/50" />
        <p className="text-lg font-medium">{t("teams.noTeams")}</p>
        <p className="text-sm text-muted-foreground">{t("teams.noTeamsDescription")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <Link key={team.id} to={`/teams/${team.id}`}>
          <Card className="transition-colors hover:bg-accent/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{team.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {team.members.length} {t("teams.members")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
