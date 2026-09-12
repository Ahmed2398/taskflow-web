import { useTranslation } from "react-i18next";

export function TeamDetailPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">{t("pages.teamDetailTitle")}</h1>
      <p className="mt-2 text-muted-foreground">{t("pages.teamDetailDescription")}</p>
    </div>
  );
}
