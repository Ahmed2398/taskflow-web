import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
