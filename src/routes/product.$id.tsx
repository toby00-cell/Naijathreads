import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, relatedProducts, formatNGN, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/cart";
import { ShoppingBag, Minus, Plus, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product, related: relatedProducts(params.id, 4) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Naija Threads` },
          { name: "description", content: loaderData.product.description ?? loaderData.product.name },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary underline">Back to shop</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-md py-24 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = (goToCart: boolean) => {
    add({ productId: product.id, size, color, qty });
    setAdded(true);
    if (goToCart) navigate({ to: "/cart" });
    else setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-md bg-hero-bg">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div>
            <p className="font-display text-[11px] font-semibold uppercase tracking-wider text-primary">{product.brand}</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-baseline gap-3">
              <p className="font-display text-3xl font-bold text-primary">{formatNGN(product.price)}</p>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <p className="text-base text-muted-foreground line-through">{formatNGN(product.originalPrice)}</p>
                  <span className="rounded-sm bg-foreground px-2 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-background">
                    Save {formatNGN(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>
            <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8">
              <p className="font-display text-xs font-bold uppercase tracking-wider">Color</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((c: string) => (
                  <button key={c} onClick={() => setColor(c)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold ${color === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="font-display text-xs font-bold uppercase tracking-wider">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s: string) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`min-w-12 rounded-sm border px-4 py-2 text-xs font-semibold ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="font-display text-xs font-bold uppercase tracking-wider">Quantity</p>
              <div className="mt-3 inline-flex items-center rounded-md border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center hover:bg-muted"><Minus className="h-4 w-4" /></button>
                <span className="w-12 text-center font-display font-bold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center hover:bg-muted"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => handleAdd(false)}
                className="inline-flex items-center gap-2 border border-foreground bg-card px-6 py-3 font-display text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background">
                {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                {added ? "Added" : "Add to Cart"}
              </button>
              <button onClick={() => handleAdd(true)}
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
                Buy Now <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">More items like this</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
              {related.map((p: Product) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
