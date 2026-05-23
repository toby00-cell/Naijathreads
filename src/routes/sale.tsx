import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS, formatNGN } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Tag, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "Sale — Naija Threads" },
      { name: "description", content: "Discounted Nigerian fashion — shirts, jeans, sneakers, caps and more at slashed prices." },
    ],
  }),
  component: SalePage,
});

function SalePage() {
  const items = PRODUCTS.filter((p) => typeof p.originalPrice === "number" && p.originalPrice! > p.price);
  const totalSaving = items.reduce((s, p) => s + (p.originalPrice! - p.price), 0);

  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-primary">
            <Tag className="h-3 w-3" /> Limited Time
          </div>
          <h1 className="mt-4 font-display text-5xl font-extrabold md:text-6xl">
            On <span className="text-primary">Sale</span> Now
          </h1>
          <p className="mt-4 max-w-xl text-sm opacity-80">
            {items.length} hand-picked styles slashed. Save up to {formatNGN(totalSaving)} across the collection — while stock lasts.
          </p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Or browse the full shop <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        {items.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">No sale items right now. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  );
}