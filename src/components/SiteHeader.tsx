import { Link, useNavigate } from "@tanstack/react-router";
import { Instagram, Mail, Search, ShoppingBag, User, MessageCircle, Menu, X, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { Shield } from "lucide-react";

type NavItem = { to: "/" | "/shop" | "/shirts" | "/trousers" | "/shoes" | "/headwears" | "/underwear" | "/sale"; label: string };
const NAV: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shirts", label: "Shirts" },
  { to: "/trousers", label: "Trousers" },
  { to: "/shoes", label: "Shoes" },
  { to: "/headwears", label: "Headwears" },
  { to: "/underwear", label: "Underwear" },
  { to: "/sale", label: "Sale" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { count } = useCart();
  const { user, isAdmin } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    navigate({ to: "/shop", search: { q: term, min: 0, max: 50000, sort: "newest" } as never });
    setSearchOpen(false);
    setQ("");
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-end gap-4 px-4 text-xs">
          <a href="https://instagram.com" aria-label="Instagram" className="opacity-80 hover:opacity-100"><Instagram className="h-4 w-4" /></a>
          <a href="https://wa.me/2349040522602" aria-label="WhatsApp" className="opacity-80 hover:opacity-100"><MessageCircle className="h-4 w-4" /></a>
          <a href="mailto:brightjoel196@gmail.com" aria-label="Email" className="opacity-80 hover:opacity-100"><Mail className="h-4 w-4" /></a>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4">
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight">
            <span className="text-primary">NAIJA</span>
            <span className="ml-1">THREADS</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`font-display text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary ${item.to === "/sale" ? "text-primary" : "text-foreground/80"}`}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary border-b-2 border-primary pb-1" }}
              >
                {item.to === "/sale" ? <span className="inline-flex items-center gap-1"><Tag className="h-3 w-3" />{item.label}</span> : item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen((v) => !v)} aria-label="Search" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
              <Search className="h-4 w-4" />
            </button>
            <Link to="/cart" aria-label="Cart" className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{count}</span>
              )}
            </Link>
            <Link to="/account" aria-label="Account" className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
              <User className="h-4 w-4" />
              {user && <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />}
            </Link>
            {isAdmin && (
              <Link to="/admin" aria-label="Admin" title="Admin dashboard" className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
                <Shield className="h-4 w-4 text-primary" />
              </Link>
            )}
            <button onClick={() => setOpen(v => !v)} aria-label="Menu" className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted lg:hidden">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search shirts, jeans, sneakers, caps…"
                maxLength={120}
                className="flex-1 bg-transparent text-sm outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close" className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {open && (
          <nav className="border-t border-border bg-background lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-2 font-display text-sm font-semibold uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
