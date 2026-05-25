import { apiRequest } from "./api";

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isVerified?: boolean;
  createdAt?: string;
};

export const authApi = {
  register: (body: { name: string; email: string; password: string }) =>
    apiRequest<{ token: string; user: ApiUser }>("/api/auth/register", { method: "POST", body, auth: false }),
  login: (body: { email: string; password: string }) =>
    apiRequest<{ token: string; user: ApiUser }>("/api/auth/login", { method: "POST", body, auth: false }),
  me: () => apiRequest<{ user: ApiUser }>("/api/auth/me"),
};