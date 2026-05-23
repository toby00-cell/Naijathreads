import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/CategoryView";

export const Route = createFileRoute("/headwears")({
  head: () => ({
    meta: [
      { title: "Headwears — Naija Threads" },
      { name: "description", content: "Shop our curated headwears collection — premium Nigerian fashion." },
    ],
  }),
  component: () => <CategoryView category="headwears" />,
});
