import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/CategoryView";

export const Route = createFileRoute("/trousers")({
  head: () => ({
    meta: [
      { title: "Trousers — Naija Threads" },
      { name: "description", content: "Shop our curated trousers collection — premium Nigerian fashion." },
    ],
  }),
  component: () => <CategoryView category="trousers" />,
});
