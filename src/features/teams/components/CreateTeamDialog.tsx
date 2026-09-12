import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

const createTeamSchema = z.object({
  name: z.string().min(2, { message: "teams.teamNameMinLength" }),
});

type CreateTeamValues = z.infer<typeof createTeamSchema>;

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

export function CreateTeamDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  errorMessage,
}: CreateTeamDialogProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTeamValues>({
    resolver: zodResolver(createTeamSchema),
  });

  const handleClose = (value: boolean) => {
    if (!value) reset();
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("teams.createTeam")}</DialogTitle>
          <DialogDescription>{t("teams.createTeamDescription")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit((values) => onSubmit(values.name))} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team-name">{t("teams.teamName")}</Label>
            <Input
              id="team-name"
              placeholder={t("teams.teamNamePlaceholder")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{t(errors.name.message!)}</p>
            )}
          </div>
          {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("common.loading") : t("teams.create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
