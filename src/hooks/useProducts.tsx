import { useQuery } from "@tanstack/react-query";
import { API_ENABLED } from "@/services/api";
import { productsApi, type ApiProduct } from "@/services/products.api";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/cart";

const toApiProduct = (p: typeof PRODUCTS[0]): ApiProduct => ({
  id: p.id,
  slug: p.id,
  name: p.name,
  category: p.category as ApiProduct["category"],
  price: p.price,
  originalPrice: p.originalPrice ?? null,
  image: p.image,
  brand: p.brand,
  sizes: p.sizes,
  colors: p.colors,
  description: p.description ?? "",
  isNew: p.isNew,
  stock: 100,
});

export function useProducts(params: Parameters<typeof productsApi.list>[0] = {}) {
  const { setApiProducts } = useCart();

  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      if (!API_ENABLED) {
        return { items: PRODUCTS.map(toApiProduct), total: PRODUCTS.length, page: 1, limit: 200 };
      }
      try {
        const result = await productsApi.list(params);
        setApiProducts(result.items);
        return result;
      } catch {
        return { items: PRODUCTS.map(toApiProduct), total: PRODUCTS.length, page: 1, limit: 200 };
      }
    },
    staleTime: 1000 * 60 * 2,
  });
}