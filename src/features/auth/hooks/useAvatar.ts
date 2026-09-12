import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { uploadAvatarRequest, removeAvatarRequest } from "@/features/auth/api/auth";
import { useAuth } from "@/shared/hooks/useAuth";

export function useAvatar() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadAvatarRequest(file),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
      toast.success(t("profile.avatarUpdated"));
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeAvatarRequest(),
    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
      toast.success(t("profile.avatarRemoved"));
    },
  });

  return {
    uploadAvatar: uploadMutation.mutate,
    isUploading: uploadMutation.isPending,
    removeAvatar: removeMutation.mutate,
    isRemoving: removeMutation.isPending,
    hasAvatar: !!user?.avatar,
  };
}
