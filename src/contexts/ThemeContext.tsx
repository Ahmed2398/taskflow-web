import { useEffect, useState, type ReactNode } from "react";
import { STORAGE_KEYS } from "@/shared/constants";
import { ThemeContext, type Theme } from "@/contexts/theme-context";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem(STORAGE_KEYS.theme) as Theme) || "system";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () =>
    setThemeState((prev) => {
      const resolved = prev === "system" ? getSystemTheme() : prev;
      return resolved === "dark" ? "light" : "dark";
    });

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
