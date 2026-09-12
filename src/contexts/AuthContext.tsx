import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, type User } from "@/contexts/auth-context";
import { getAccessToken, setTokens as storeTokens, clearTokens } from "@/shared/lib/token-storage";
import { getCurrentUserRequest } from "@/features/auth/api/auth";
import { ROUTES } from "@/shared/constants";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(() => getAccessToken() !== null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    getCurrentUserRequest()
      .then((data) => setUser(data))
      .catch(() => {
        clearTokens();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const setTokens = useCallback(
    async (accessToken: string, refreshToken: string) => {
      storeTokens(accessToken, refreshToken);
      try {
        const data = await getCurrentUserRequest();
        setUser(data);
      } catch {
        setUser(null);
      }
    },
    [],
  );

  const updateUser = useCallback(
    (partial: Partial<User>) => {
      setUser((prev) => (prev ? { ...prev, ...partial } : prev));
    },
    [],
  );

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    // TODO: disconnect WebSocket when Phase 8 realtime work is wired in
    navigate(ROUTES.login);
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, setTokens, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
