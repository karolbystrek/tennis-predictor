const DEFAULT_BASE = "http://localhost:8080/api";

export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) ?? DEFAULT_BASE;

export function apiUrl(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export const ENDPOINTS = {
  PREDICT: apiUrl("/api/predictions"),
  PLAYERS: apiUrl("/api/players"),
  LOGIN: apiUrl("/auth/login"),
  SIGNUP: apiUrl("/auth/signup"),
};
