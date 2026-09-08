import { Globe } from "lucide-react";
import { useLanguage } from "@/shared/hooks/useLanguage";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("language.toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang("en")}>
          {t("language.english")}
          {lang === "en" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("ar")}>
          {t("language.arabic")}
          {lang === "ar" && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
