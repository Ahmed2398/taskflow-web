import { api } from "@/shared/lib/api";
import type { User } from "@/contexts/auth-context";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export type CurrentUserResponse = User;

export async function registerRequest(payload: {
  email: string;
  name: string;
  password: string;
  phone: string;
  title: string;
}): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function loginRequest(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function getCurrentUserRequest(): Promise<CurrentUserResponse> {
  const { data } = await api.get<CurrentUserResponse>("/auth/me");
  return data;
}

export async function uploadAvatarRequest(file: File): Promise<User> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<User>("/users/avatar", formData);
  return data;
}

export async function removeAvatarRequest(): Promise<User> {
  const { data } = await api.delete<User>("/users/avatar");
  return data;
}
