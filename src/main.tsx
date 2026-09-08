import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/i18n";
import { AppProviders } from "@/app/providers/AppProviders";
import { ErrorBoundary } from "@/app/router/ErrorBoundary";
import { AppRouter } from "@/app/router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  </StrictMode>,
);
