import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import { Users, FolderKanban, ChevronsUpDown, LayoutDashboard } from "lucide-react";
import { ROUTES } from "@/shared/constants";
import { UserMenu } from "@/shared/components/UserMenu";
import { Separator } from "@/shared/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { cn } from "@/shared/lib/utils";

export function Sidebar() {
  const { t } = useTranslation();
  const { teamId } = useParams();

  const navItems = [
    { label: t("nav.dashboard"), to: ROUTES.home, icon: LayoutDashboard, exact: true },
    { label: t("nav.teams"), to: ROUTES.teams, icon: Users, exact: true },
    {
      label: t("nav.projects"),
      to: teamId ? `/teams/${teamId}` : ROUTES.teams,
      icon: FolderKanban,
      exact: false,
      disabled: !teamId,
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4">
        <img src="/favicon.svg" alt={t("common.appName")} className="h-8 w-8" />
        <span className="text-lg font-bold">{t("common.appName")}</span>
      </div>

      <Separator />

      {/* Team switcher (placeholder) */}
      <div className="px-2 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-accent transition-colors">
              <span className="text-muted-foreground">
                {teamId ? t("sidebar.teamActive") : t("sidebar.noTeam")}
              </span>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full">
            <DropdownMenuLabel>{t("sidebar.selectTeam")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              {t("sidebar.noTeamsAvailable")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.disabled) {
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </div>
            );
          }
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <Separator />

      {/* User menu */}
      <div className="p-2">
        <UserMenu />
      </div>
    </div>
  );
}
