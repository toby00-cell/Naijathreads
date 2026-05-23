import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  component: ReturnsPage,
});

function ReturnsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold mb-8">Returns & Exchanges</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Return Policy</h2>
        <p className="text-sm opacity-70 leading-relaxed">We accept returns within 24 hours of delivery. Items must be unused, unwashed, and in their original packaging with tags attached.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">How to Return</h2>
        <p className="text-sm opacity-70 leading-relaxed">Contact us via WhatsApp or email within 24 hours of receiving your order. Share your order number and reason for return. We will arrange a pickup or provide a drop-off address.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Exchanges</h2>
        <p className="text-sm opacity-70 leading-relaxed">If you need a different size or colour, we will process an exchange subject to availability. Exchange requests must also be made within 24 hours of delivery.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Refunds</h2>
        <p className="text-sm opacity-70 leading-relaxed">Approved refunds are processed within 3–5 business days back to your original payment method.</p>
      </section>
    </main>
  );
}