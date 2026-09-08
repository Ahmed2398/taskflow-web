import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import { STORAGE_KEYS } from "@/shared/constants";

const savedLang = localStorage.getItem(STORAGE_KEYS.language) || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export function setLanguage(lang: string) {
  i18n.changeLanguage(lang);
  localStorage.setItem(STORAGE_KEYS.language, lang);
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}

document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
document.documentElement.lang = savedLang;

export default i18n;
