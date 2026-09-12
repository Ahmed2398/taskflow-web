import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { registerSchema, type RegisterValues } from "@/features/auth/schemas/auth-schemas";

interface RegisterFormProps {
  onSubmit: (values: RegisterValues) => void;
  isSubmitting: boolean;
  error?: string;
}

export function RegisterForm({ onSubmit, isSubmitting, error }: RegisterFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t("auth.name")}</Label>
        <Input id="name" type="text" placeholder="John Doe" {...register("name")} />
        {errors.name && <p className="text-sm text-destructive">{t(errors.name.message!)}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("auth.email")}</Label>
        <Input id="email" type="email" placeholder="user@example.com" {...register("email")} />
        {errors.email && <p className="text-sm text-destructive">{t(errors.email.message!)}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("auth.phone")}</Label>
        <Input id="phone" type="tel" placeholder="+1234567890" {...register("phone")} />
        {errors.phone && <p className="text-sm text-destructive">{t(errors.phone.message!)}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">{t("auth.title")}</Label>
        <Input id="title" type="text" placeholder={t("auth.titlePlaceholder")} {...register("title")} />
        {errors.title && <p className="text-sm text-destructive">{t(errors.title.message!)}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("auth.password")}</Label>
        <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
        {errors.password && <p className="text-sm text-destructive">{t(errors.password.message!)}</p>}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("common.loading") : t("auth.registerButton")}
      </Button>
    </form>
  );
}
