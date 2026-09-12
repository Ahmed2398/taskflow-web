import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ListSkeleton } from "@/shared/components/skeletons";
import type { TeamMember, MemberRole } from "@/features/teams/api/teams";

interface MemberListProps {
  members: TeamMember[];
  isLoading: boolean;
  currentUserRole: MemberRole | null;
  currentUserId: string;
  onRemove: (memberUserId: string) => void;
  isRemoving: boolean;
}

const roleVariant: Record<MemberRole, "default" | "secondary" | "outline"> = {
  OWNER: "default",
  ADMIN: "secondary",
  MEMBER: "outline",
};

export function MemberList({
  members,
  isLoading,
  currentUserRole,
  currentUserId,
  onRemove,
  isRemoving,
}: MemberListProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return <ListSkeleton count={4} />;
  }

  const canRemove = currentUserRole === "OWNER" || currentUserRole === "ADMIN";

  return (
    <div className="space-y-2">
      {members.map((member) => {
        const initials = member.user.name
          ? member.user.name.slice(0, 2).toUpperCase()
          : member.user.email.slice(0, 2).toUpperCase();
        const isSelf = member.user.id === currentUserId;

        return (
          <div
            key={member.user.id}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            <Avatar size="sm">
              {member.user.avatar ? (
                <AvatarImage src={member.user.avatar} alt={member.user.name} />
              ) : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{member.user.name}</p>
              <p className="truncate text-sm text-muted-foreground">
                {member.user.email}
              </p>
            </div>
            <Badge variant={roleVariant[member.role]}>
              {t(`roles.${member.role}`)}
            </Badge>
            {canRemove && !isSelf && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(member.user.id)}
                disabled={isRemoving}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
