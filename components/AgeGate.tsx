"use client";

import AnimatedLogo from "./AnimatedLogo";

// The gate is server-rendered so it covers the page on a first visit with no
// flash. An inline script in <head> (see app/layout.tsx) sets
// html[data-age-ok] before paint for returning visitors, which hides it via CSS.
import { AGE_KEY } from "@/lib/data";

export default function AgeGate() {
  const accept = () => {
    try {
      localStorage.setItem(AGE_KEY, "1");
    } catch {}
    document.documentElement.setAttribute("data-age-ok", "");
  };

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="age-card">
        <div className="age-logo">
          <AnimatedLogo size={160} />
        </div>
        <h2 id="age-title">Are you 21 or older?</h2>
        <p>You must be of legal age to enter this site.</p>
        <div className="age-actions">
          <button type="button" className="pill pill-pink" onClick={accept}>
            Yes, enter
          </button>
          <a href="https://www.google.com" className="pill pill-outline">
            No
          </a>
        </div>
      </div>
    </div>
  );
}
