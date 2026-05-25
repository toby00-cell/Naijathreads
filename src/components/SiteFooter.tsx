import { Instagram, Mail, MessageCircle, CreditCard, RotateCcw, Headphones, Store } from "lucide-react";
import { Link } from "@tanstack/react-router";

const features = [
  { icon: CreditCard, title: "Secure Payment", desc: "100% secure payment" },
  { icon: RotateCcw, title: "24 Hours Return", desc: "If goods have problems" },
  { icon: Headphones, title: "Responsive Support", desc: "Dedicated support" },
  { icon: Store, title: "Walk in Shop", desc: "Visit our Lagos store" },
];

export function FeaturesStrip() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col items-center text-center">
            <f.icon className="mb-3 h-8 w-8 text-primary" />
            <h3 className="font-display text-base font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm opacity-70">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-extrabold">
            <span className="text-primary">NAIJA</span> THREADS
          </div>
          <p className="mt-3 max-w-xs text-sm opacity-70">
            Quality Nigerian fashion. Shirts, trousers, shoes, headwears & underwear — curated for the modern Naija wardrobe.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-primary hover:border-primary"><Instagram className="h-4 w-4" /></a>
            <a href="https://wa.me/2349040522602" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-primary hover:border-primary"><MessageCircle className="h-4 w-4" /></a>
            <a href="mailto:brightjoel196@gmail.com" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-primary hover:border-primary"><Mail className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-primary">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link to="/sale" className="text-primary hover:underline">Sale</Link></li>
            <li><Link to="/shirts" className="hover:text-primary">Shirts</Link></li>
            <li><Link to="/trousers" className="hover:text-primary">Trousers / Jeans</Link></li>
            <li><Link to="/shoes" className="hover:text-primary">Shoes</Link></li>
            <li><Link to="/headwears" className="hover:text-primary">Headwears</Link></li>
            <li><Link to="/underwear" className="hover:text-primary">Underwear</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-primary">Help</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link to="/shipping" className="hover:text-primary">Shipping & Delivery</Link></li>
            <li><Link to="/returns" className="hover:text-primary">Returns & Exchanges</Link></li>
            <li><Link to="/size-guide" className="hover:text-primary">Size Guide</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-primary">Visit</h4>
          <p className="mt-4 text-sm opacity-80">
            14 Adeola Odeku Street<br />
            Efab Plaza, Abuja<br />
            Mon–Sat · 9am–8pm
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 text-xs opacity-60">
          <span>© {new Date().getFullYear()} Naija Threads. All rights reserved.</span>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 text-xs opacity-60">
          <span>© {new Date().getFullYear()} Naija Threads. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>

  );
}