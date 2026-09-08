import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { ROUTES } from "@/shared/constants";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-4 text-center">
      <h1 className="text-6xl font-bold">{t("notFound.title")}</h1>
      <p className="text-lg text-muted-foreground">{t("notFound.description")}</p>
      <Button asChild>
        <Link to={ROUTES.home}>{t("notFound.goHome")}</Link>
      </Button>
    </div>
  );
}
