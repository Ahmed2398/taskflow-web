import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar: string | null;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
