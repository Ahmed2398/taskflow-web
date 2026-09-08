import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { registerRequest } from "@/features/auth/api/auth";
import { useAuth } from "@/shared/hooks/useAuth";
import { ROUTES } from "@/shared/constants";
import type { RegisterValues } from "@/features/auth/schemas/auth-schemas";

export function useRegister() {
  const navigate = useNavigate();
  const { setTokens } = useAuth();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: (values: RegisterValues) => registerRequest(values),
    onSuccess: async (data) => {
      await setTokens(data.accessToken, data.refreshToken);
      toast.success(t("auth.registerSuccess"));
      navigate(ROUTES.teams);
    },
  });

  return {
    submit: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
