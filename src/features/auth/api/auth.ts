import { api } from "@/shared/lib/api";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface CurrentUserResponse {
  userId: string;
  email: string;
}

export async function registerRequest(payload: {
  email: string;
  name: string;
  password: string;
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
