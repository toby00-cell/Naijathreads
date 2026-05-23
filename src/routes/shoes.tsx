import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/CategoryView";

export const Route = createFileRoute("/shoes")({
  head: () => ({
    meta: [
      { title: "Shoes — Naija Threads" },
      { name: "description", content: "Shop our curated shoes collection — premium Nigerian fashion." },
    ],
  }),
  component: () => <CategoryView category="shoes" />,
});
