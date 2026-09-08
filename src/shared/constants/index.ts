export const STORAGE_KEYS = {
  accessToken: "taskflow-access-token",
  refreshToken: "taskflow-refresh-token",
  theme: "taskflow-theme",
  language: "taskflow-lang",
} as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  teams: "/teams",
  dashboard: "/dashboard",
} as const;
