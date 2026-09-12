import { Navigate, useParams } from "react-router-dom";

export function TeamMembersPage() {
  const { teamId } = useParams<{ teamId: string }>();
  return <Navigate to={`/teams/${teamId}`} replace />;
}
