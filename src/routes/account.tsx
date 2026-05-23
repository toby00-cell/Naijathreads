import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Package, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/auth";
import { formatNGN } from "@/data/products";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — Naija Threads" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, signOut, orders } = useAuth();

  if (!user) return <AuthForms />;

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <UserIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground">Welcome back</p>
            <h1 className="font-display text-2xl font-extrabold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <button onClick={signOut} className="inline-flex items-center gap-2 border border-border px-4 py-2 font-display text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-primary">
          <LogOut className="h-3 w-3" /> Sign out
        </button>
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-extrabold">Order History</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold">{orders.length}</span>
        </div>

        {orders.length === 0 ? (
          <div className="mt-6 grid place-items-center rounded-md border border-dashed border-border py-16 text-center">
            <p className="font-display text-lg font-bold">No orders yet</p>
            <p className="mt-1 text-sm text-muted-foreground">When you place an order it will show up here.</p>
            <Link to="/shop" className="mt-5 inline-flex bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((o) => (
              <article key={o.id} className="rounded-md border border-border bg-card">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
                  <div>
                    <p className="font-display text-sm font-bold">Order {o.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}
                      {" · "}{o.delivery.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-primary">
                      {o.status}
                    </span>
                    <p className="font-display text-base font-bold text-primary">{formatNGN(o.total)}</p>
                  </div>
                </header>
                <ul className="divide-y divide-border">
                  {o.items.map((it, idx) => (
                    <li key={idx} className="flex items-center gap-3 p-4">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-hero-bg">
                        <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="line-clamp-1 font-medium">{it.name}</p>
                        <p className="text-xs text-muted-foreground">{it.size} · {it.color} · ×{it.qty}</p>
                      </div>
                      <p className="text-sm font-semibold">{formatNGN(it.price * it.qty)}</p>
                    </li>
                  ))}
                </ul>
                <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border p-4 text-xs text-muted-foreground">
                  <span>Ship to: <span className="font-medium text-foreground">{o.delivery.fullName}</span> · {o.delivery.address}</span>
                  <span>Payment: <span className="font-medium text-foreground capitalize">{o.payment}</span></span>
                </footer>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AuthForms() {
  const { signIn, signUp, orders } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    const name = String(fd.get("name") ?? "");
    const res = await (mode === "login" ? signIn(email, password) : signUp(name, email, password));
    if (!res.ok) setError(res.error);
    else setError(null);
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary"><UserIcon className="h-6 w-6" /></div>
      <h1 className="mt-4 font-display text-3xl font-extrabold">{mode === "login" ? "Sign In" : "Create Account"}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{mode === "login" ? "Welcome back to Naija Threads." : "Join Naija Threads to track your orders."}</p>

      {orders.length > 0 && (
        <p className="mt-4 rounded-md border border-primary/30 bg-primary/5 p-3 text-xs text-foreground">
          You have <span className="font-bold text-primary">{orders.length} guest order(s)</span> on this device — create an account to keep them in your history.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {mode === "signup" && (
          <Input label="Full name" name="name" required />
        )}
        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required minLength={6} />
        {error && <p className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">{error}</p>}
        <button type="submit" className="w-full bg-primary py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === "login" ? "New here? " : "Already have an account? "}
        <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }} className="font-semibold text-primary hover:underline">
          {mode === "login" ? "Create an account" : "Sign in"}
        </button>
      </p>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">← Back to home</Link>
      </p>
    </section>
  );
}

function Input({ label, name, type = "text", required, minLength }: { label: string; name: string; type?: string; required?: boolean; minLength?: number }) {
  return (
    <label className="block">
      <span className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input name={name} type={type} required={required} minLength={minLength} maxLength={255}
        className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
    </label>
  );
}