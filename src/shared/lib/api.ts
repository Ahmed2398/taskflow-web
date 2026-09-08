import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "@/shared/lib/token-storage";
import { env } from "@/shared/config/env";

export const api = axios.create({
  baseURL: env.apiUrl,
});

// --- Request interceptor: attach access token if present ---
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response interceptor: handle 401 with refresh + queue ---
let isRefreshing = false;
let pendingQueue: Array<(newAccessToken: string) => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    // Already retried once — give up to prevent infinite loop
    if (originalRequest._retry) {
      clearTokens();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // A refresh is already in flight — queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push((newAccessToken: string) => {
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            originalRequest._retry = true;
            resolve(api(originalRequest));
          } else {
            reject(error);
          }
        });
      });
    }

    // Start the refresh process
    isRefreshing = true;
    originalRequest._retry = true;

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      window.location.href = "/login";
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      // Use raw axios to avoid triggering interceptors recursively
      const response = await axios.post(
        `${env.apiUrl}/auth/refresh`,
        { refreshToken },
      );
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

      setTokens(newAccessToken, newRefreshToken);

      // Resolve all queued requests with the new access token
      pendingQueue.forEach((cb) => cb(newAccessToken));
      pendingQueue = [];

      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch {
      // Refresh failed — clear everything and redirect
      clearTokens();
      pendingQueue.forEach((cb) => cb(""));
      pendingQueue = [];
      window.location.href = "/login";
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);
