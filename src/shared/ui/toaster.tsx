import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "rounded-md border bg-card text-card-foreground shadow-sm",
        },
      }}
    />
  );
}
