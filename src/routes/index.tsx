import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroPile from "@/assets/hero-pile.png";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FeaturesStrip } from "@/components/SiteFooter";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 6);
  return (
    <>
      {/* HERO */}
      <section className="bg-hero-bg">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-foreground md:text-7xl">
              Welcome To
              <br />
              <span className="text-primary">NAIJA THREADS</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              The home of Nigerian fashion. From ankara shirts to leather sneakers — quality you can feel, prices you can afford.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
              {["Authentic Brands", "Premium Quality", "Speedy Delivery"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" /></span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/sale"
                className="inline-flex items-center gap-3 bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore Shop <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 border border-foreground px-8 py-4 font-display text-sm font-bold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background"
              >
                Browse All
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroPile}
              alt="Stack of Nigerian fashion — shirts, jeans, shoes and caps"
              width={1280}
              height={960}
              className="mx-auto h-auto w-full max-w-xl drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <FeaturesStrip />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-primary">Browse</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Shop by Category</h2>
          </div>
          <Link to="/shop" className="hidden font-display text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary md:inline-flex">View All →</Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={c.path}
              className="group relative aspect-[3/4] overflow-hidden rounded-md bg-muted"
            >
              <img src={c.image} alt={c.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-lg font-bold uppercase tracking-wide text-white">{c.label}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-white/80">Shop now <ArrowRight className="h-3 w-3" /></p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-wider text-primary">Check out latest products</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold md:text-4xl">New Arrivals</h2>
            </div>
            <Link to="/shop" className="font-display text-sm font-semibold uppercase tracking-wider text-foreground hover:text-primary">View All →</Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA STRIPE */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl font-extrabold md:text-3xl">Free delivery within Lagos on orders above ₦50,000</h3>
            <p className="mt-1 text-sm opacity-90">Nationwide shipping available · Pay on delivery in select cities</p>
          </div>
          <Link to="/sale" className="inline-flex items-center gap-2 bg-ink px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-ink-foreground hover:bg-ink/80">
            Start Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
