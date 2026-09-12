import { useEffect } from "react";
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

const editTeamSchema = z.object({
  name: z.string().min(2, { message: "teams.teamNameMinLength" }),
});

type EditTeamValues = z.infer<typeof editTeamSchema>;

interface EditTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
  isSubmitting: boolean;
  currentName: string;
}

export function EditTeamDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  currentName,
}: EditTeamDialogProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTeamValues>({
    resolver: zodResolver(editTeamSchema),
    defaultValues: { name: currentName },
  });

  useEffect(() => {
    if (open) reset({ name: currentName });
  }, [open, currentName, reset]);

  const handleClose = (value: boolean) => {
    if (!value) reset();
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("teams.editTeam")}</DialogTitle>
          <DialogDescription>{t("teams.editTeamDescription")}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) => {
            onSubmit(values.name);
            onOpenChange(false);
          })}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="edit-team-name">{t("teams.teamName")}</Label>
            <Input id="edit-team-name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{t(errors.name.message!)}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("common.loading") : t("common.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
