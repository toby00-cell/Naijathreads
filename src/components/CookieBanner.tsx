import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("naija-cookies-accepted");
    if (!accepted) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink text-ink-foreground border-t border-white/10 px-4 py-4">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm opacity-80 max-w-xl">
          We use local storage to keep your cart and session. No tracking cookies. 
          By continuing to use this site you agree to our{" "}
          <Link to="/privacy" className="text-primary underline">Privacy Policy</Link>.
        </p>
        <button
          onClick={() => {
            localStorage.setItem("naija-cookies-accepted", "true");
            setShow(false);
          }}
          className="bg-primary px-5 py-2 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 shrink-0"
        >
          Got it
        </button>
      </div>
    </div>
  );
}