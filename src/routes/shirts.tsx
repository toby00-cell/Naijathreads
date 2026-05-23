import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/CategoryView";

export const Route = createFileRoute("/shirts")({
  head: () => ({
    meta: [
      { title: "Shirts — Naija Threads" },
      { name: "description", content: "Shop our curated shirts collection — premium Nigerian fashion." },
    ],
  }),
  component: () => <CategoryView category="shirts" />,
});
