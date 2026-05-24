import { apiRequest } from "./api";

export type ApiProduct = {
  id: string;
  slug: string;
  name: string;
  category: "shirts" | "trousers" | "shoes" | "headwears" | "underwear";
  price: number;
  originalPrice?: number | null;
  image: string;
  images?: string[];
  brand: string;
  sizes: string[];
  colors: string[];
  description: string;
  isNew?: boolean;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductListQuery = { q?: string; category?: string; min?: number; max?: number; sort?: string; page?: number; limit?: number };

function qs(p: Record<string, unknown>) {
  const s = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => { if (v !== undefined && v !== "" && v !== null) s.set(k, String(v)); });
  const out = s.toString();
  return out ? `?${out}` : "";
}

export const productsApi = {
  list: (params: ProductListQuery = {}) =>
    apiRequest<{ items: ApiProduct[]; total: number; page: number; limit: number }>(`/api/products${qs(params)}`, { auth: false }),
  get: (id: string) => apiRequest<ApiProduct>(`/api/products/${id}`, { auth: false }),
  create: (body: Partial<ApiProduct>) => apiRequest<ApiProduct>("/api/products", { method: "POST", body }),
  update: (id: string, body: Partial<ApiProduct>) => apiRequest<ApiProduct>(`/api/products/${id}`, { method: "PATCH", body }),
  remove: (id: string) => apiRequest<{ ok: true }>(`/api/products/${id}`, { method: "DELETE" }),

  uploadImage: async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return apiRequest<{ url: string; publicId: string }>("/api/uploads/image", { method: "POST", body: fd });
  },

  replaceProductImage: async (id: string, file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return apiRequest<ApiProduct>(`/api/products/${id}/image`, { method: "POST", body: fd });
  },

  addProductImage: async (id: string, file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    return apiRequest<ApiProduct>(`/api/products/${id}/images`, { method: "POST", body: fd });
  },

  deleteProductImage: async (id: string, index: number) => {
    return apiRequest<ApiProduct>(`/api/products/${id}/images/${index}`, { method: "DELETE" });
  },
};