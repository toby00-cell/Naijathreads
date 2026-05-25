import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Naija Threads" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold mb-2">Terms & Conditions</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: May 25, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p className="text-sm opacity-70 leading-relaxed">By accessing and using naijathreads.name.ng, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Products and Pricing</h2>
        <p className="text-sm opacity-70 leading-relaxed">All prices are listed in Nigerian Naira (₦) and are subject to change without notice. We reserve the right to modify or discontinue products at any time. We are not liable if a product is unavailable after an order is placed.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Orders and Payment</h2>
        <p className="text-sm opacity-70 leading-relaxed">By placing an order, you confirm that all information provided is accurate. Payment is processed securely via Paystack. An order is only confirmed once payment is successfully completed and you receive a confirmation email.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Delivery</h2>
        <p className="text-sm opacity-70 leading-relaxed">Delivery times are estimates and not guaranteed. Naija Threads is not liable for delays caused by courier services, weather, or other factors outside our control. Delivery fees are non-refundable once an order is dispatched.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Returns and Refunds</h2>
        <p className="text-sm opacity-70 leading-relaxed">Returns are accepted within 24 hours of delivery for items that are unused, unwashed, and in original packaging. Refunds are processed within 3–5 business days. Items purchased on sale are non-refundable unless faulty.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Account Responsibility</h2>
        <p className="text-sm opacity-70 leading-relaxed">You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility. Notify us immediately if you suspect unauthorized access.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
        <p className="text-sm opacity-70 leading-relaxed">All content on this website including text, images, logos, and design is the property of Naija Threads and may not be reproduced without written permission.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
        <p className="text-sm opacity-70 leading-relaxed">Naija Threads shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our maximum liability is limited to the value of your order.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
        <p className="text-sm opacity-70 leading-relaxed">These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved under Nigerian law.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
        <p className="text-sm opacity-70 leading-relaxed">For any questions regarding these Terms, contact us at hello@naijathreads.name.ng.</p>
      </section>
    </main>
  );
}