import { createContext } from "react";

export type Lang = "en" | "ar";

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "ltr" | "rtl";
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
