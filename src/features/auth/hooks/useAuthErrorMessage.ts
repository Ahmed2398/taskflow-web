import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

/**
 * Maps a mutation error to a translated user-facing message.
 * Each status code in `statusMessages` maps to an i18n key.
 * Falls back to `common.error` for unmapped statuses.
 */
export function useAuthErrorMessage(
  isError: boolean,
  error: Error | null,
  statusMessages: Record<number, string>,
): string | undefined {
  const { t } = useTranslation();

  if (!isError) return undefined;

  const status = (error as AxiosError)?.response?.status;
  if (status && statusMessages[status]) {
    return t(statusMessages[status]);
  }
  return t("common.error");
}
