"use client";

import Link from "next/link";
import { useState } from "react";
import AnimatedLogo from "./AnimatedLogo";
import { footerCols } from "@/lib/data";

export default function Footer() {
  const [joined, setJoined] = useState(false);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <AnimatedLogo size={96} />
          </div>
          <div className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>
            Primo Vapes &amp; Exotics
            <br />
            Smoke shop
          </div>
        </div>
        {footerCols.map((col) => (
          <nav key={col.title} className="footer-col" aria-label={col.title}>
            <h2 className="footer-heading">{col.title}</h2>
            {col.links.map((l) => (
              <Link key={l.name} href={l.href}>
                {l.name}
              </Link>
            ))}
          </nav>
        ))}
        <div className="footer-col">
          <h2 className="footer-heading" id="newsletter-label">
            Deals in your inbox
          </h2>
          {joined ? (
            <p className="muted" style={{ margin: 0 }} role="status">
              You&apos;re on the list.
            </p>
          ) : (
            <form
              className="newsletter"
              aria-labelledby="newsletter-label"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire to email provider (Klaviyo, Mailchimp, etc.)
                setJoined(true);
              }}
            >
              <input type="email" name="email" placeholder="Email" aria-label="Email address" required />
              <button type="submit" className="pill pill-pink">
                Join
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="container legal">
        Products are intended for adults 21+. Not for use by minors, pregnant or nursing women. These statements have
        not been evaluated by the FDA. © 2026 Primo Vapes &amp; Exotics.
      </div>
    </footer>
  );
}
