import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold mb-8">Contact Us</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex gap-4 items-start">
          <MessageCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
          <div>
            <h2 className="font-semibold mb-1">WhatsApp</h2>
            <a href="https://wa.me/2349040522602" className="text-sm opacity-70 hover:text-primary">+234 904 052 2602</a>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <Mail className="h-5 w-5 text-primary mt-1 shrink-0" />
          <div>
            <h2 className="font-semibold mb-1">Email</h2>
            <a href="mailto:hello@naijathreads.ng" className="text-sm opacity-70 hover:text-primary">hello@naijathreads.ng</a>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
          <div>
            <h2 className="font-semibold mb-1">Store Address</h2>
            <p className="text-sm opacity-70">New Banex Plaza<br />Wuse, Abuja</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
          <div>
            <h2 className="font-semibold mb-1">Opening Hours</h2>
            <p className="text-sm opacity-70">Monday – Saturday<br />9:00am – 8:00pm</p>
          </div>
        </div>
      </div>
    </main>
  );
}
