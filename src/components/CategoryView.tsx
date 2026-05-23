import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Search, X } from "lucide-react";

export function CategoryView({ category }: { category: Category }) {
  const cat = CATEGORIES.find((c) => c.slug === category)!;
  const [q, setQ] = useState("");
  const [size, setSize] = useState<string | undefined>();
  const [maxPrice, setMaxPrice] = useState(60000);
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest");

  const all = useMemo(() => PRODUCTS.filter((p) => p.category === category), [category]);
  const sizes = useMemo(() => Array.from(new Set(all.flatMap((p) => p.sizes))), [all]);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    let list = all.filter((p) => {
      if (size && !p.sizes.includes(size)) return false;
      if (p.price > maxPrice) return false;
      if (t && !`${p.name} ${p.brand}`.toLowerCase().includes(t)) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "newest") list = [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [all, q, size, maxPrice, sort]);

  return (
    <>
      <section className="bg-hero-bg">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="font-display text-xs font-semibold uppercase tracking-wider text-primary">Category</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">{cat.label}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{filtered.length} item{filtered.length !== 1 ? "s" : ""} available</p>

          <div className="relative mt-6 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${cat.label.toLowerCase()}…`}
              className="h-12 w-full rounded-md border border-border bg-card pl-11 pr-11 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
            />
            {q && (
              <button onClick={() => setQ("")} aria-label="Clear" className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">Price (max)</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₦0</span><span>₦{maxPrice.toLocaleString()}</span>
              </div>
              <input type="range" min={5000} max={60000} step={500} value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
            </div>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">Size</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <button onClick={() => setSize(undefined)}
                className={`min-w-10 rounded-sm border px-3 py-2 text-xs font-semibold ${!size ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>Any</button>
              {sizes.map((s) => (
                <button key={s} onClick={() => setSize(size === s ? undefined : s)}
                  className={`min-w-10 rounded-sm border px-3 py-2 text-xs font-semibold ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>{s}</button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">Showing <span className="font-semibold text-foreground">{filtered.length}</span> products</p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium outline-none focus:border-primary">
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-md border border-dashed border-border py-24 text-center">
              <p className="font-display text-xl font-bold">No products match your filters</p>
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
