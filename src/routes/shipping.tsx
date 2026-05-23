import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold mb-8">Shipping & Delivery</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Delivery Timeframes</h2>
        <p className="text-sm opacity-70 leading-relaxed">Orders within Abuja are delivered within 1–3 business days. Orders outside Abuja typically take 1–3 business days depending on your location.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Shipping Fees</h2>
        <p className="text-sm opacity-70 leading-relaxed">Abuja delivery: ₦1,500. Other states: ₦2,500–₦4,000 depending on location. Free shipping on orders above ₦50,000.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Order Tracking</h2>
        <p className="text-sm opacity-70 leading-relaxed">Once your order is dispatched, you will receive a tracking number via email or WhatsApp. You can use this to track your delivery.</p>
      </section>
    </main>
  );
}
