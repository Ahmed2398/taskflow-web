import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/i18n";
import { LanguageContext, type Lang } from "@/contexts/language-context";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const lang = (i18n.language as Lang) || "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  const setLang = (l: Lang) => {
    setLanguage(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}
