import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Camera, Trash2, Mail, Phone, Briefcase, Calendar } from "lucide-react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useAvatar } from "@/features/auth/hooks/useAvatar";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

export function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { uploadAvatar, isUploading, removeAvatar, isRemoving, hasAvatar } = useAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const initials = user.name
    ? user.name.slice(0, 2).toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

  const formattedDate = new Date(user.createdAt).toLocaleDateString();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
      e.target.value = "";
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">{t("profile.title")}</h1>

      {/* Avatar section */}
      <Card>
        <CardHeader>
          <CardTitle>{t("profile.avatar")}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar size="lg" className="size-20">
            {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Camera className="mr-2 h-4 w-4" />
              {isUploading ? t("common.loading") : t("profile.uploadAvatar")}
            </Button>
            {hasAvatar && (
              <Button
                variant="outline"
                onClick={() => removeAvatar()}
                disabled={isRemoving}
                className="ml-2"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isRemoving ? t("common.loading") : t("profile.removeAvatar")}
              </Button>
            )}
            <p className="text-xs text-muted-foreground">
              {t("profile.avatarHint")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile info */}
      <Card>
        <CardHeader>
          <CardTitle>{t("profile.information")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("auth.name")}</Label>
            <Input value={user.name} readOnly />
          </div>

          <div className="space-y-2">
            <Label>{t("auth.email")}</Label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Input value={user.email} readOnly />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("auth.phone")}</Label>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <Input value={user.phone} readOnly />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("auth.title")}</Label>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <Input value={user.title} readOnly />
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {t("profile.memberSince")} {formattedDate}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
