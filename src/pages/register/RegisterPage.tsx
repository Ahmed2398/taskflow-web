import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { useAuthErrorMessage } from "@/features/auth/hooks/useAuthErrorMessage";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { AuthLayout } from "@/shared/components/AuthLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ROUTES } from "@/shared/constants";
import type { RegisterValues } from "@/features/auth/schemas/auth-schemas";

export function RegisterPage() {
  const { t } = useTranslation();
  const { submit, isPending, isError, error } = useRegister();

  const errorMessage = useAuthErrorMessage(isError, error, {
    409: "auth.emailInUse",
  });

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("auth.registerTitle")}</CardTitle>
          <CardDescription>{t("auth.registerDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RegisterForm onSubmit={(values: RegisterValues) => submit(values)} isSubmitting={isPending} error={errorMessage} />
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.haveAccount")}{" "}
            <Link to={ROUTES.login} className="text-primary hover:underline">
              {t("auth.login")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
