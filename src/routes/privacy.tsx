import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Naija Threads" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: May 25, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
        <p className="text-sm opacity-70 leading-relaxed">Naija Threads ("we", "us", or "our") operates the website naijathreads.name.ng. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
        <p className="text-sm opacity-70 leading-relaxed mb-3">We collect information you provide directly to us, including:</p>
        <ul className="text-sm opacity-70 leading-relaxed list-disc pl-5 space-y-1">
          <li>Full name and email address when you create an account</li>
          <li>Delivery address, phone number, and location when you place an order</li>
          <li>Payment information processed securely through Paystack</li>
          <li>Order history and transaction records</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
        <ul className="text-sm opacity-70 leading-relaxed list-disc pl-5 space-y-1">
          <li>To process and fulfill your orders</li>
          <li>To send order confirmation and shipping notifications to your email</li>
          <li>To manage your account and order history</li>
          <li>To respond to your inquiries and provide customer support</li>
          <li>To improve our website and services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Payment Security</h2>
        <p className="text-sm opacity-70 leading-relaxed">All payments are processed through Paystack, a PCI-DSS compliant payment processor. We do not store your card details on our servers. Paystack's privacy policy is available at paystack.com/privacy.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Data Storage</h2>
        <p className="text-sm opacity-70 leading-relaxed">Your data is stored securely on MongoDB Atlas servers. We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and data by contacting us.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Sharing Your Information</h2>
        <p className="text-sm opacity-70 leading-relaxed">We do not sell, trade, or rent your personal information to third parties. We may share your delivery information with courier services solely for the purpose of fulfilling your order.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
        <p className="text-sm opacity-70 leading-relaxed">We use local storage to maintain your shopping cart and session. No third-party tracking cookies are used on this website.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">8. Your Rights (NDPR)</h2>
        <p className="text-sm opacity-70 leading-relaxed">Under the Nigeria Data Protection Regulation (NDPR), you have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@naijathreads.name.ng.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
        <p className="text-sm opacity-70 leading-relaxed">If you have questions about this Privacy Policy, contact us at hello@naijathreads.name.ng or via WhatsApp at +234 800 000 0000.</p>
      </section>
    </main>
  );
}