import { apiRequest } from "./api";

export type ApiOrder = {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: {
    productId: string;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    qty: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  delivery: {
    fullName: string;
    phone: string;
    address: string;
    location: string;
  };
  payment: string;
  status: "Processing" | "Shipped" | "Delivered";
  createdAt: string;
};

export const ordersApi = {
  create: (body: Omit<ApiOrder, "id" | "status" | "createdAt">) =>
    apiRequest<ApiOrder>("/api/orders", { method: "POST", body }),
  my: () => apiRequest<ApiOrder[]>("/api/orders/my"),
  all: () => apiRequest<ApiOrder[]>("/api/orders"),
  updateStatus: (id: string, status: string) =>
    apiRequest<ApiOrder>(`/api/orders/${id}/status`, { method: "PATCH", body: { status } }),
};