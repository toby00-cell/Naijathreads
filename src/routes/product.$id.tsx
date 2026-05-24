import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatNGN } from "@/data/products";
import { productsApi, type ApiProduct } from "@/services/products.api";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/cart";
import { ShoppingBag, Minus, Plus, Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { API_ENABLED } from "@/services/api";
import { getProduct, relatedProducts } from "@/data/products";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [{ title: "Product — Naija Threads" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary underline">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();

  const { data: apiProduct, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        return await productsApi.get(id);
      } catch {
        return null;
      }
    },
    enabled: API_ENABLED,
    retry: false,
  });

  const localProduct = getProduct(id);

  const { data: allData } = useProducts();
  const apiRelated = API_ENABLED && apiProduct
    ? (allData?.items ?? []).filter((p) => p.category === apiProduct.category && p.id !== id).slice(0, 4)
    : [];
  const localRelated = !API_ENABLED || !apiProduct ? relatedProducts(id, 4) : [];

  if (API_ENABLED && isLoading) return <div className="py-24 text-center text-sm text-muted-foreground">Loading…</div>;

  const product = (API_ENABLED && apiProduct ? apiProduct : localProduct) as ApiProduct | undefined;
  const related = API_ENABLED && apiProduct ? apiRelated : localRelated;

  if (!product) return (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block text-primary underline">Back to shop</Link>
    </div>
  );

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
          <ImageGallery image={product.image} images={product.images ?? []} name={product.name} />

          <ProductDetails product={product} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">More items like this</h2>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ImageGallery({ image, images, name }: { image: string; images: string[]; name: string }) {
  const allImages = [image, ...images];
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? allImages.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === allImages.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-md bg-hero-bg">
        <img
          src={allImages[current]}
          alt={name}
          className="h-full w-full object-cover transition-opacity duration-300"
        />
        {allImages.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/80 hover:bg-background shadow">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/80 hover:bg-background shadow">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${i === current ? "border-primary" : "border-border"}`}
            >
              <img src={img} alt={`${name} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductDetails({ product }: { product: ApiProduct }) {
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
          {product.colors.map((c) => (
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
          {product.sizes.map((s) => (
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
  );
}