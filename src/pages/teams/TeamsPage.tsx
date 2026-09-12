import { useTranslation } from "react-i18next";

export function TeamsPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{t("auth.teamsPlaceholder")}</h2>
        <p className="text-muted-foreground">{t("auth.teamsPlaceholderDescription")}</p>
      </div>
    </div>
  );
}
