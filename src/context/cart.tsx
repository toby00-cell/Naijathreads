import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import { type ApiProduct } from "@/services/products.api";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  qty: number;
};

type AnyProduct = Product | ApiProduct;

type CartContextValue = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  itemsWithProduct: (CartItem & { product: AnyProduct })[];
  setApiProducts: (products: ApiProduct[]) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "naija-threads-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const itemsWithProduct = items
      .map((i) => {
        const product =
          apiProducts.find((p) => p.id === i.productId) ??
          PRODUCTS.find((p) => p.id === i.productId);
        return product ? { ...i, product } : null;
      })
      .filter((x): x is CartItem & { product: AnyProduct } => x !== null);

    return {
      items,
      itemsWithProduct,
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: itemsWithProduct.reduce((s, i) => s + i.product.price * i.qty, 0),
      setApiProducts,
      add: (item) =>
        setItems((prev) => {
          const idx = prev.findIndex(
            (p) => p.productId === item.productId && p.size === item.size && p.color === item.color,
          );
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
            return next;
          }
          return [...prev, item];
        }),
      remove: (productId, size, color) =>
        setItems((prev) => prev.filter((p) => !(p.productId === productId && p.size === size && p.color === color))),
      updateQty: (productId, size, color, qty) =>
        setItems((prev) =>
          prev
            .map((p) => (p.productId === productId && p.size === size && p.color === color ? { ...p, qty } : p))
            .filter((p) => p.qty > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items, apiProducts]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}