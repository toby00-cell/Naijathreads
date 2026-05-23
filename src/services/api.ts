// Minimal fetch-based API client for the Naija Threads backend.
// Reads `VITE_API_URL` at build time. When the variable is empty the
// frontend falls back to local-only behaviour (auth via localStorage,
// products from the static catalog).

export const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") || "";
export const API_ENABLED = !!API_URL;

const TOKEN_KEY = "naija-threads-token-v1";

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
  set: (t: string) => { if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, t); },
  clear: () => { if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY); },
};

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown; auth?: boolean };

export async function apiRequest<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  if (!API_ENABLED) throw new ApiError("API is not configured (VITE_API_URL is empty).", 0);
  const headers = new Headers(opts.headers || {});
  let body: BodyInit | undefined;
  if (opts.body instanceof FormData) {
    body = opts.body;
  } else if (opts.body !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(opts.body);
  }
  if (opts.auth !== false) {
    const t = tokenStore.get();
    if (t) headers.set("Authorization", `Bearer ${t}`);
  }
  const res = await fetch(`${API_URL}${path}`, { ...opts, headers, body });
  const text = await res.text();
  const data = text ? safeJSON(text) : null;
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `Request failed (${res.status})`;
    throw new ApiError(msg, res.status, data);
  }
  return data as T;
}

function safeJSON(s: string) { try { return JSON.parse(s); } catch { return s; } }