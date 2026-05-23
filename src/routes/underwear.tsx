import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/CategoryView";

export const Route = createFileRoute("/underwear")({
  head: () => ({
    meta: [
      { title: "Underwear — Naija Threads" },
      { name: "description", content: "Shop our curated underwear collection — premium Nigerian fashion." },
    ],
  }),
  component: () => <CategoryView category="underwear" />,
});
