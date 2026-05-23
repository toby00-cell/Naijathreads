import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/context/cart";
import { formatNGN, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Naija Threads" }] }),
  component: CartPage,
});

function CartPage() {
  const { itemsWithProduct, updateQty, remove, subtotal, count } = useCart();
  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 2500;
  const total = subtotal + shipping;

  const suggestions = (() => {
    if (itemsWithProduct.length === 0) return PRODUCTS.filter((p) => p.isNew).slice(0, 4);
    const cats = new Set(itemsWithProduct.map((i) => i.product.category));
    const ids = new Set(itemsWithProduct.map((i) => i.productId));
    return PRODUCTS.filter((p) => cats.has(p.category) && !ids.has(p.id)).slice(0, 4);
  })();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-display text-3xl font-extrabold md:text-4xl">Your Cart</h1>
      <p className="mt-1 text-sm text-muted-foreground">{count} item{count !== 1 ? "s" : ""}</p>

      {itemsWithProduct.length === 0 ? (
        <div className="mt-10 grid place-items-center rounded-md border border-dashed border-border py-20 text-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-display text-xl font-bold">Your cart is empty</p>
          <Link to="/sale" className="mt-5 inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
            Start Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {itemsWithProduct.map((i) => (
              <div key={`${i.productId}-${i.size}-${i.color}`} className="flex gap-4 rounded-md border border-border bg-card p-4">
                <Link to="/product/$id" params={{ id: i.productId }} className="block aspect-square w-24 shrink-0 overflow-hidden rounded bg-hero-bg">
                  <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{i.product.brand}</p>
                      <Link to="/product/$id" params={{ id: i.productId }} className="font-medium hover:text-primary">{i.product.name}</Link>
                      <p className="mt-1 text-xs text-muted-foreground">Size: <span className="font-semibold text-foreground">{i.size}</span> · Color: <span className="font-semibold text-foreground">{i.color}</span></p>
                    </div>
                    <p className="font-display font-bold text-primary">{formatNGN(i.product.price * i.qty)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="inline-flex items-center rounded-md border border-border">
                      <button onClick={() => updateQty(i.productId, i.size, i.color, i.qty - 1)} className="grid h-8 w-8 place-items-center hover:bg-muted"><Minus className="h-3 w-3" /></button>
                      <span className="w-10 text-center text-sm font-bold">{i.qty}</span>
                      <button onClick={() => updateQty(i.productId, i.size, i.color, i.qty + 1)} className="grid h-8 w-8 place-items-center hover:bg-muted"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => remove(i.productId, i.size, i.color)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-md border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-wider">Order Summary</h2>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold">{formatNGN(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd className="font-semibold">{shipping === 0 ? "Free" : formatNGN(shipping)}</dd></div>
              <div className="border-t border-border pt-3 flex justify-between font-display text-base font-bold"><dt>Total</dt><dd className="text-primary">{formatNGN(total)}</dd></div>
            </dl>
            <Link to="/checkout" className="mt-6 flex items-center justify-center gap-2 bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground hover:text-primary">Continue shopping</Link>
          </aside>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-extrabold">More items like this</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
            {suggestions.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </section>
  );
}
