import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserPlus, FolderKanban, Settings, Trash2 } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useTeams } from "@/features/teams/hooks/useTeams";
import { useTeamMembers } from "@/features/teams/hooks/useTeamMembers";
import { useCurrentUserRole } from "@/features/teams/hooks/useCurrentUserRole";
import { useAddMember } from "@/features/teams/hooks/useAddMember";
import { useRemoveMember } from "@/features/teams/hooks/useRemoveMember";
import { useUpdateTeam } from "@/features/teams/hooks/useUpdateTeam";
import { useDeleteTeam } from "@/features/teams/hooks/useDeleteTeam";
import { MemberList } from "@/features/teams/components/MemberList";
import { InviteMemberDialog } from "@/features/teams/components/InviteMemberDialog";
import { EditTeamDialog } from "@/features/teams/components/EditTeamDialog";
import { DeleteTeamDialog } from "@/features/teams/components/DeleteTeamDialog";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

export function TeamDetailPage() {
  const { t } = useTranslation();
  const { teamId } = useParams<{ teamId: string }>();
  const { user } = useAuth();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"members" | "projects">("members");

  const { teams } = useTeams();
  const currentTeam = teams.find((tm) => tm.id === teamId);
  const { members, isLoading } = useTeamMembers(teamId);
  const { role } = useCurrentUserRole(teamId);
  const { submit: addMemberSubmit, isPending: isAdding, error: addError } = useAddMember(teamId!);
  const { submit: removeMemberSubmit, isPending: isRemoving } = useRemoveMember(teamId!);
  const { submit: updateTeamSubmit, isPending: isUpdating } = useUpdateTeam(teamId!);
  const { submit: deleteTeamSubmit, isPending: isDeleting } = useDeleteTeam(teamId!);

  const canManage = role === "OWNER" || role === "ADMIN";

  const tabs = [
    { key: "members" as const, label: t("teams.members"), icon: UserPlus },
    { key: "projects" as const, label: t("teams.projects"), icon: FolderKanban },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {currentTeam?.name ?? t("teams.teamDetail")}
        </h1>
        {canManage && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              {t("teams.editTeam")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4 text-destructive" />
              {t("teams.deleteTeam")}
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Members tab */}
      {activeTab === "members" && (
        <div className="space-y-4">
          {canManage && (
            <div className="flex justify-end">
              <Button onClick={() => setInviteOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                {t("teams.inviteMember")}
              </Button>
            </div>
          )}
          <MemberList
            members={members}
            isLoading={isLoading}
            currentUserRole={role}
            currentUserId={user?.id ?? ""}
            onRemove={removeMemberSubmit}
            isRemoving={isRemoving}
          />
          <InviteMemberDialog
            open={inviteOpen}
            onOpenChange={setInviteOpen}
            onSubmit={addMemberSubmit}
            isSubmitting={isAdding}
            errorMessage={
              addError
                ? (addError as { response?: { status?: number } }).response?.status === 404
                  ? t("teams.userNotFound")
                  : (addError as { response?: { status?: number } }).response?.status === 409
                    ? t("teams.alreadyMember")
                    : t("teams.couldNotAdd")
                : undefined
            }
          />
        </div>
      )}

      <EditTeamDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={updateTeamSubmit}
        isSubmitting={isUpdating}
        currentName={currentTeam?.name ?? ""}
      />

      <DeleteTeamDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={deleteTeamSubmit}
        isDeleting={isDeleting}
        teamName={currentTeam?.name ?? ""}
      />

      {/* Projects tab (placeholder) */}
      {activeTab === "projects" && (
        <Card>
          <CardHeader>
            <CardTitle>{t("teams.projects")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t("teams.projectsPlaceholder")}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
