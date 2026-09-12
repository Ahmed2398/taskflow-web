import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import type { MemberRole } from "@/features/teams/api/teams";

const inviteSchema = z.object({
  email: z.email({ message: "auth.invalidEmail" }),
  role: z.enum(["MEMBER", "ADMIN"]),
});

type InviteValues = z.infer<typeof inviteSchema>;

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: { email: string; role?: MemberRole }) => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

export function InviteMemberDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  errorMessage,
}: InviteMemberDialogProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<InviteValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { role: "MEMBER" },
  });

  const roleValue = watch("role");

  const handleClose = (value: boolean) => {
    if (!value) reset();
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("teams.inviteMember")}</DialogTitle>
          <DialogDescription>{t("teams.inviteMemberDescription")}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) =>
            onSubmit({ email: values.email, role: values.role }),
          )}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="member-email">{t("teams.memberEmail")}</Label>
            <Input
              id="member-email"
              type="email"
              placeholder="user@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{t(errors.email.message!)}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t("teams.memberRole")}</Label>
            <Select
              value={roleValue}
              onValueChange={(val) => setValue("role", val as "MEMBER" | "ADMIN")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEMBER">{t("roles.MEMBER")}</SelectItem>
                <SelectItem value="ADMIN">{t("roles.ADMIN")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("common.loading") : t("teams.invite")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
