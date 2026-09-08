import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { LanguageToggle } from "@/shared/components/LanguageToggle";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/shared/hooks/useAuth";

export function TeamsPage() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-bold">{t("common.appName")}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={logout}>
            {t("auth.logout")}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{t("auth.teamsPlaceholder")}</h2>
          <p className="text-muted-foreground">{t("auth.teamsPlaceholderDescription")}</p>
        </div>
      </main>
    </div>
  );
}
