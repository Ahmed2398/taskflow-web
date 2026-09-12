import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { ROUTES } from "@/shared/constants";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export function UserMenu() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : user?.email
      ? user.email.slice(0, 2).toUpperCase()
      : "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-md p-2 text-sm hover:bg-accent transition-colors">
          <Avatar size="sm">
            {user?.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="truncate text-left flex-1 text-muted-foreground">
            {user?.name || user?.email}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top" sideOffset={8} className="w-56">
        <DropdownMenuLabel className="truncate">{user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(ROUTES.profile)}>
          <UserIcon className="mr-2 h-4 w-4" />
          {t("profile.title")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          {t("auth.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
