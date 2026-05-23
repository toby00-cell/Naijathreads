import { type Product, formatNGN } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const onSale = typeof product.originalPrice === "number" && product.originalPrice > product.price;
  const discount = onSale
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-hero-bg">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {onSale && (
            <span className="rounded-sm bg-foreground px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-background">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-sm bg-primary px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              New
            </span>
          )}
        </div>
        <span
          aria-hidden
          className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="font-display text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{product.brand}</p>
        <h3 className="text-sm font-medium text-foreground line-clamp-1">{product.name}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <p className="font-display text-base font-bold text-primary">{formatNGN(product.price)}</p>
          {onSale && (
            <p className="text-xs text-muted-foreground line-through">{formatNGN(product.originalPrice!)}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
