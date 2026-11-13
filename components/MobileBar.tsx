"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedLogo from "./AnimatedLogo";
import { AccountIcon, BagIcon } from "./Icons";
import { useCart } from "./CartProvider";
import { navItems } from "@/lib/data";
import { isActive } from "./Header";

/**
 * Compact header that slides in once the page header has scrolled away.
 * Phones/tablets only (hidden above 900px in CSS), so the cart is always a tap away.
 */
export default function MobileBar() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <div className="mobile-bar" data-show={show} aria-hidden={!show} inert={!show}>
      <Link href="/" className="mobile-bar-logo" aria-label="Primo Vapes & Exotics — home">
        <AnimatedLogo size={40} />
      </Link>
      <nav className="nav" aria-label="Main (compact)">
        {navItems.map((n) => (
          <Link key={n.name} href={n.href} aria-current={isActive(n.href, pathname) ? "page" : undefined}>
            {n.name}
          </Link>
        ))}
      </nav>
      <Link href="/account" className="icon-btn" aria-label="Account">
        <AccountIcon />
      </Link>
      <button
        type="button"
        className="icon-btn"
        onClick={open}
        aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
        aria-haspopup="dialog"
      >
        <BagIcon />
        <span className="badge" aria-hidden>
          {count}
        </span>
      </button>
    </div>
  );
}
