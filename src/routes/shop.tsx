import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo } from "react";
import { CATEGORIES, type Category } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Search, X } from "lucide-react";

const CATS = ["shirts", "trousers", "shoes", "headwears", "underwear"] as const;
const SORTS = ["newest", "price-asc", "price-desc"] as const;

const schema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.enum(CATS).optional(), undefined),
  min: fallback(z.number(), 0).default(0),
  max: fallback(z.number(), 50000).default(50000),
  size: fallback(z.string().optional(), undefined),
  sort: fallback(z.enum(SORTS), "newest").default("newest"),
});

export const Route = createFileRoute("/shop")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "Shop — Naija Threads" },
      { name: "description", content: "Browse shirts, trousers, shoes, headwears and underwear with smart search and filters." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const update = (patch: Partial<typeof search>) => {
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });
  };

  const { data } = useProducts();
  const allProducts = data?.items ?? [];

  const allSizes = useMemo(() => {
    const s = new Set<string>();
    allProducts.forEach((p) => p.sizes.forEach((x) => s.add(x)));
    return Array.from(s);
  }, [allProducts]);

  const filtered = useMemo(() => {
    const q = search.q.trim().toLowerCase();
    let list = allProducts.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (p.price < search.min || p.price > search.max) return false;
      if (search.size && !p.sizes.includes(search.size)) return false;
      if (q && !(`${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q))) return false;
      return true;
    });
    if (search.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (search.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (search.sort === "newest") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [search, allProducts]);

  const activeCat = CATEGORIES.find((c) => c.slug === search.category);

  return (
    <>
      <section className="bg-hero-bg">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-primary">Shop</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">
            {activeCat ? activeCat.label : "All Products"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""} available
          </p>
          <div className="relative mt-6 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search shirts, jeans, sneakers, caps…"
              className="h-12 w-full rounded-md border border-border bg-card pl-11 pr-11 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
            />
            {search.q && (
              <button
                onClick={() => update({ q: "" })}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip active={!search.category} onClick={() => update({ category: undefined })}>All</Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c.slug} active={search.category === c.slug} onClick={() => update({ category: c.slug as Category })}>
                {c.label}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-8">
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">Price Range</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>₦{search.min.toLocaleString()}</span>
                <span>₦{search.max.toLocaleString()}</span>
              </div>
              <input
                type="range" min={0} max={50000} step={500}
                value={search.max}
                onChange={(e) => update({ max: Number(e.target.value) })}
                className="w-full accent-primary"
              />
              <div className="grid grid-cols-2 gap-2">
                <NumInput label="Min" value={search.min} onChange={(v) => update({ min: v })} />
                <NumInput label="Max" value={search.max} onChange={(v) => update({ max: v })} />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { l: "Under ₦10k", min: 0, max: 10000 },
                  { l: "₦10k–20k", min: 10000, max: 20000 },
                  { l: "₦20k–35k", min: 20000, max: 35000 },
                  { l: "₦35k+", min: 35000, max: 50000 },
                ].map((r) => (
                  <button key={r.l} onClick={() => update({ min: r.min, max: r.max })}
                    className="rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium hover:border-primary hover:text-primary">
                    {r.l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">Size</h3>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <button
                onClick={() => update({ size: undefined })}
                className={`min-w-10 rounded-sm border px-3 py-2 text-xs font-semibold ${!search.size ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}
              >Any</button>
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => update({ size: search.size === s ? undefined : s })}
                  className={`min-w-10 rounded-sm border px-3 py-2 text-xs font-semibold ${search.size === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate({ search: { q: "", category: undefined, min: 0, max: 50000, size: undefined, sort: "newest" } })}
            className="w-full border border-border bg-card px-4 py-3 font-display text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-primary"
          >
            Reset Filters
          </button>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">{filtered.length}</span> products</p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort:</span>
              <select
                value={search.sort}
                onChange={(e) => update({ sort: e.target.value as typeof SORTS[number] })}
                className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium outline-none focus:border-primary"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-md border border-dashed border-border py-24 text-center">
              <p className="font-display text-xl font-bold">No products match your filters</p>
              <p className="mt-2 text-sm text-muted-foreground">Try a different category or widen your price range.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function NumInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        type="number" min={0} step={500}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-1 w-full rounded-md border border-border bg-card px-2 py-1.5 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}