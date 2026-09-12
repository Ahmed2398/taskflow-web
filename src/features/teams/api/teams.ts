import { api } from "@/shared/lib/api";
import type { User } from "@/contexts/auth-context";

export type MemberRole = "OWNER" | "ADMIN" | "MEMBER";

export interface TeamMember {
  id: string;
  role: MemberRole;
  joinedAt: string;
  userId: string;
  teamId: string;
  user: User;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt?: string;
  _count?: { projects: number };
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export async function getMyTeams(): Promise<Team[]> {
  const { data } = await api.get<PaginatedResponse<Team>>("/teams/mine");
  return data.data;
}

export async function getTeamMembers(teamId: string): Promise<TeamMember[]> {
  const { data } = await api.get<TeamMember[]>(`/teams/${teamId}/members`);
  return Array.isArray(data) ? data : (data as unknown as PaginatedResponse<TeamMember>).data ?? [];
}

export async function createTeam(name: string): Promise<Team> {
  const { data } = await api.post<Team>("/teams", { name });
  return data;
}

export async function addMember(
  teamId: string,
  payload: { email: string; role?: MemberRole },
): Promise<TeamMember> {
  const { data } = await api.post<TeamMember>(`/teams/${teamId}/members`, payload);
  return data;
}

export async function removeMember(
  teamId: string,
  memberUserId: string,
): Promise<void> {
  await api.delete(`/teams/${teamId}/members/${memberUserId}`);
}

export async function updateTeam(
  teamId: string,
  name: string,
): Promise<Team> {
  const { data } = await api.patch<Team>(`/teams/${teamId}`, { name });
  return data;
}

export async function deleteTeam(teamId: string): Promise<void> {
  await api.delete(`/teams/${teamId}`);
}

