import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { formatNGN } from "@/data/products";
import { MapPin } from "lucide-react";
import { API_ENABLED } from "@/services/api";
import { ordersApi } from "@/services/orders.api";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Naija Threads" }] }),
  component: CheckoutPage,
});

export const ABUJA_LOCATIONS: { value: string; label: string; fee: number; eta: string }[] = [
  { value: "abj-wuse", label: "Abuja — Wuse", fee: 2000, eta: "Same day" },
  { value: "abj-maitama", label: "Abuja — Maitama", fee: 2000, eta: "Same day" },
  { value: "abj-asokoro", label: "Abuja — Asokoro", fee: 2200, eta: "Same day" },
  { value: "abj-garki", label: "Abuja — Garki", fee: 2000, eta: "Same day" },
  { value: "abj-cbd", label: "Abuja — Central Business District", fee: 1800, eta: "Same day" },
  { value: "abj-utako", label: "Abuja — Utako", fee: 2200, eta: "Same day" },
  { value: "abj-jabi", label: "Abuja — Jabi", fee: 2300, eta: "Next day" },
  { value: "abj-wuye", label: "Abuja — Wuye", fee: 2500, eta: "Next day" },
  { value: "abj-gwarinpa", label: "Abuja — Gwarinpa", fee: 3000, eta: "Next day" },
  { value: "abj-life-camp", label: "Abuja — Life Camp", fee: 3200, eta: "Next day" },
  { value: "abj-katampe", label: "Abuja — Katampe", fee: 3500, eta: "Next day" },
  { value: "abj-kubwa", label: "Abuja — Kubwa", fee: 3800, eta: "1–2 days" },
  { value: "abj-lugbe", label: "Abuja — Lugbe", fee: 3800, eta: "1–2 days" },
  { value: "abj-airport-rd", label: "Abuja — Airport Road", fee: 4000, eta: "1–2 days" },
  { value: "abj-karu", label: "Abuja — Karu", fee: 4500, eta: "1–2 days" },
  { value: "abj-nyanya", label: "Abuja — Nyanya", fee: 4500, eta: "1–2 days" },
  { value: "abj-gwagwalada", label: "Abuja — Gwagwalada", fee: 5000, eta: "2 days" },
  { value: "abj-bwari", label: "Abuja — Bwari", fee: 5500, eta: "2 days" },
  { value: "lagos", label: "Lagos (any LGA)", fee: 2500, eta: "1–2 days" },
  { value: "other", label: "Other states (nationwide)", fee: 6500, eta: "3–5 days" },
];

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Enter phone").max(20),
  address: z.string().trim().min(5, "Enter address").max(255),
  location: z.string().min(1, "Pick a delivery location"),
  notes: z.string().max(500).optional(),
});

function CheckoutPage() {
  const { itemsWithProduct, subtotal, clear, count } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();

  const [location, setLocation] = useState<string>(ABUJA_LOCATIONS[0].value);
  const selectedLoc = useMemo(() => ABUJA_LOCATIONS.find((l) => l.value === location)!, [location]);
  const freeShipping = subtotal >= 75000;
  const shipping = subtotal === 0 ? 0 : freeShipping ? 0 : selectedLoc.fee;
  const total = subtotal + shipping;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path.join(".")] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setSubmitError(null);

    const loc = ABUJA_LOCATIONS.find((l) => l.value === parsed.data.location)!;
    const orderData = {
      userId: user?.id ?? "guest",
      customerName: parsed.data.fullName,
      customerEmail: parsed.data.email,
      items: itemsWithProduct.map((i) => ({
        productId: i.productId,
        size: i.size,
        color: i.color,
        qty: i.qty,
        name: i.product.name,
        price: i.product.price,
        image: i.product.image,
      })),
      subtotal,
      shipping,
      total,
      delivery: {
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        address: parsed.data.address,
        location: loc.label,
      },
      payment: "card",
    };

    try {
      const { default: PaystackPop } = await import("@paystack/inline-js" as any);
      const handler = new (PaystackPop as any)();
      handler.newTransaction({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: parsed.data.email,
        amount: total * 100,
        currency: "NGN",
        onSuccess: async (transaction: any) => {
          try {
            if (API_ENABLED) {
              await ordersApi.create({ ...orderData, paystackReference: transaction.reference } as any);
            } else {
              addOrder(orderData as any);
            }
            clear();
            navigate({ to: "/account" });
          } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Order failed after payment");
            setSubmitting(false);
          }
        },
        onCancel: () => {
          setSubmitting(false);
          setSubmitError("Payment was cancelled.");
        },
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to load Paystack");
      setSubmitting(false);
    }
  };

  if (count === 0) {
    return (
      <section className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Nothing to check out</h1>
        <Link to="/shop" className="mt-6 inline-flex bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">Go to shop</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-display text-3xl font-extrabold md:text-4xl">Checkout</h1>
      {!user && (
        <p className="mt-2 text-sm text-muted-foreground">
          Want to track this order? <Link to="/account" className="font-semibold text-primary hover:underline">Sign in or create an account</Link>.
        </p>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <form onSubmit={onSubmit} className="space-y-8">
          <Section title="Contact">
            <Field label="Full name" name="fullName" defaultValue={user?.name} error={errors.fullName} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Email" name="email" type="email" defaultValue={user?.email} error={errors.email} />
              <Field label="Phone" name="phone" type="tel" error={errors.phone} />
            </div>
          </Section>

          <Section title="Delivery">
            <Field label="Street address" name="address" error={errors.address} />
            <label className="block">
              <span className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Delivery location</span>
              <select
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <optgroup label="Abuja (FCT)">
                  {ABUJA_LOCATIONS.filter((l) => l.value.startsWith("abj-")).map((l) => (
                    <option key={l.value} value={l.value}>{l.label} — {formatNGN(l.fee)} · {l.eta}</option>
                  ))}
                </optgroup>
                <optgroup label="Other">
                  {ABUJA_LOCATIONS.filter((l) => !l.value.startsWith("abj-")).map((l) => (
                    <option key={l.value} value={l.value}>{l.label} — {formatNGN(l.fee)} · {l.eta}</option>
                  ))}
                </optgroup>
              </select>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3" /> Delivery fee updates based on the selected location.
              </span>
            </label>
            <label className="block">
              <span className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Delivery notes (optional)</span>
              <textarea name="notes" rows={3} maxLength={500} className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
            </label>
          </Section>

          {submitError && (
            <p className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{submitError}</p>
          )}

          <button type="submit" disabled={submitting} className="w-full bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {submitting ? "Opening payment…" : `Pay ${formatNGN(total)} with Paystack`}
          </button>
        </form>

        <aside className="h-fit rounded-md border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold uppercase tracking-wider">Your Order</h2>
          <ul className="mt-4 divide-y divide-border">
            {itemsWithProduct.map((i) => (
              <li key={`${i.productId}-${i.size}-${i.color}`} className="flex gap-3 py-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-hero-bg">
                  <img src={i.product.image} alt={i.product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="line-clamp-1 font-medium">{i.product.name}</p>
                  <p className="text-xs text-muted-foreground">{i.size} · {i.color} · ×{i.qty}</p>
                </div>
                <p className="text-sm font-bold">{formatNGN(i.product.price * i.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold">{formatNGN(subtotal)}</dd></div>
            <div className="flex justify-between">
              <dt>Delivery <span className="text-xs text-muted-foreground">({selectedLoc.label.replace(/^Abuja — /, "")})</span></dt>
              <dd className="font-semibold">{shipping === 0 ? "Free" : formatNGN(shipping)}</dd>
            </div>
            {freeShipping && <p className="text-[11px] text-primary">🎉 Free delivery on orders above ₦75,000</p>}
            <div className="border-t border-border pt-3 flex justify-between font-display text-base font-bold"><dt>Total</dt><dd className="text-primary">{formatNGN(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-card p-6">
      <h2 className="font-display text-lg font-bold uppercase tracking-wider">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", error, defaultValue }: { label: string; name: string; type?: string; error?: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <input name={name} type={type} maxLength={255} defaultValue={defaultValue}
        className={`mt-1 w-full rounded-md border bg-card px-3 py-2 text-sm outline-none focus:border-primary ${error ? "border-destructive" : "border-border"}`} />
      {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
}