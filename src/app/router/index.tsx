import { Routes, Route } from "react-router-dom";
import { LoginPage } from "@/pages/login/LoginPage";
import { RegisterPage } from "@/pages/register/RegisterPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { TeamsPage } from "@/pages/teams/TeamsPage";
import { TeamDetailPage } from "@/pages/teams/TeamDetailPage";
import { TeamMembersPage } from "@/pages/teams/TeamMembersPage";
import { ProjectDetailPage } from "@/pages/projects/ProjectDetailPage";
import { BoardPage } from "@/pages/boards/BoardPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { NotFoundPage } from "@/pages/not-found/NotFoundPage";
import { ProtectedRoute } from "@/app/router/ProtectedRoute";
import { PublicOnlyRoute } from "@/app/router/PublicOnlyRoute";
import { AppShell } from "@/shared/components/AppShell";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:teamId" element={<TeamDetailPage />} />
          <Route path="/teams/:teamId/members" element={<TeamMembersPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/boards/:boardId" element={<BoardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
