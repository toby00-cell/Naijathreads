import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "@/context/cart";
import { API_ENABLED, ApiError, tokenStore } from "@/services/api";
import { authApi, type ApiUser } from "@/services/auth.api";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  passwordHash?: string; // only used by the local fallback
};

export type Order = {
  id: string;
  userId: string;
  createdAt: string;
  items: (CartItem & { name: string; price: number; image: string })[];
  subtotal: number;
  shipping: number;
  total: number;
  delivery: { fullName: string; phone: string; address: string; location: string };
  payment: string;
  status: "Processing" | "Shipped" | "Delivered";
};

type AuthResult = { ok: true } | { ok: false; error: string };
type AuthContextValue = {
  user: StoredUser | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => void;
  orders: Order[];
  addOrder: (o: Omit<Order, "id" | "userId" | "createdAt" | "status">) => Order;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "naija-threads-users-v1";
const SESSION_KEY = "naija-threads-session-v1";
const ORDERS_KEY = "naija-threads-orders-v1";

// tiny obfuscation only — NOT real security
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i), (h |= 0);
  return String(h);
};

const toStored = (u: ApiUser): StoredUser => ({ id: u.id, name: u.name, email: u.email, role: u.role });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [apiUser, setApiUser] = useState<StoredUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(API_ENABLED);

  // hydrate local persistence (for guest orders + local fallback)
  useEffect(() => {
    try {
      const u = localStorage.getItem(USERS_KEY);
      const s = localStorage.getItem(SESSION_KEY);
      const o = localStorage.getItem(ORDERS_KEY);
      if (u) setUsers(JSON.parse(u));
      if (s) setUserId(JSON.parse(s));
      if (o) setOrders(JSON.parse(o));
    } catch {}
    setHydrated(true);
  }, []);

  // restore session from backend if a token exists
  useEffect(() => {
    if (!API_ENABLED) return;
    let cancelled = false;
    (async () => {
      const t = tokenStore.get();
      if (!t) { setLoading(false); return; }
      try {
        const { user } = await authApi.me();
        if (!cancelled) setApiUser(toStored(user));
      } catch {
        tokenStore.clear();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => { if (hydrated && !API_ENABLED) localStorage.setItem(USERS_KEY, JSON.stringify(users)); }, [users, hydrated]);
  useEffect(() => { if (hydrated && !API_ENABLED) localStorage.setItem(SESSION_KEY, JSON.stringify(userId)); }, [userId, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }, [orders, hydrated]);

  const value = useMemo<AuthContextValue>(() => {
    const localUser = users.find((u) => u.id === userId) ?? null;
    const user = API_ENABLED ? apiUser : localUser;
    const scopeId = user?.id ?? "guest";

    const signUpLocal = async (name: string, email: string, password: string): Promise<AuthResult> => {
      const e = email.trim().toLowerCase();
      if (!name.trim() || !e || password.length < 6) return { ok: false, error: "Fill all fields. Password ≥ 6 chars." };
      if (users.some((u) => u.email === e)) return { ok: false, error: "An account with that email already exists." };
      const u: StoredUser = { id: "u_" + Math.random().toString(36).slice(2, 9), name: name.trim(), email: e, role: "user", passwordHash: hash(password) };
      setUsers((prev) => [...prev, u]);
      setUserId(u.id);
      return { ok: true };
    };
    const signInLocal = async (email: string, password: string): Promise<AuthResult> => {
      const e = email.trim().toLowerCase();
      const u = users.find((x) => x.email === e);
      if (!u || u.passwordHash !== hash(password)) return { ok: false, error: "Invalid email or password." };
      setUserId(u.id);
      return { ok: true };
    };

    const signUpApi = async (name: string, email: string, password: string): Promise<AuthResult> => {
      try {
        const { token, user } = await authApi.register({ name, email, password });
        tokenStore.set(token);
        setApiUser(toStored(user));
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof ApiError ? err.message : "Sign up failed" };
      }
    };
    const signInApi = async (email: string, password: string): Promise<AuthResult> => {
      try {
        const { token, user } = await authApi.login({ email, password });
        tokenStore.set(token);
        setApiUser(toStored(user));
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err instanceof ApiError ? err.message : "Sign in failed" };
      }
    };

    return {
      user,
      loading,
      isAdmin: user?.role === "admin",
      orders: orders.filter((o) => o.userId === scopeId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      signUp: API_ENABLED ? signUpApi : signUpLocal,
      signIn: API_ENABLED ? signInApi : signInLocal,
      signOut: () => {
        if (API_ENABLED) { tokenStore.clear(); setApiUser(null); }
        else setUserId(null);
      },
      addOrder: (o) => {
        const order: Order = {
          ...o,
          id: "NT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
          userId: user?.id ?? "guest",
          createdAt: new Date().toISOString(),
          status: "Processing",
        };
        setOrders((prev) => [order, ...prev]);
        return order;
      },
    };
  }, [users, userId, apiUser, orders, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}