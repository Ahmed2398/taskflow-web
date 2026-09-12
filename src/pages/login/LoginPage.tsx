import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuthErrorMessage } from "@/features/auth/hooks/useAuthErrorMessage";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthLayout } from "@/shared/components/AuthLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ROUTES } from "@/shared/constants";
import type { LoginValues } from "@/features/auth/schemas/auth-schemas";

export function LoginPage() {
  const { t } = useTranslation();
  const { submit, isPending, isError, error } = useLogin();

  const errorMessage = useAuthErrorMessage(isError, error, {
    401: "auth.invalidCredentials",
  });

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("auth.loginTitle")}</CardTitle>
          <CardDescription>{t("auth.loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm onSubmit={(values: LoginValues) => submit(values)} isSubmitting={isPending} error={errorMessage} />
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.noAccount")}{" "}
            <Link to={ROUTES.register} className="text-primary hover:underline">
              {t("auth.register")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
