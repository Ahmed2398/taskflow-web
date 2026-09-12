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
  teamDetail: "/teams/:teamId",
  teamMembers: "/teams/:teamId/members",
  project: "/projects/:projectId",
  board: "/boards/:boardId",
  dashboard: "/dashboard",
} as const;
