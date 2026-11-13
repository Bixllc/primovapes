"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedLogo from "./AnimatedLogo";
import { AccountIcon, BagIcon, SearchIcon } from "./Icons";
import { useCart } from "./CartProvider";
import { navItems } from "@/lib/data";

export function isActive(href: string, pathname: string) {
  if (href === "/#shop") return pathname === "/" || pathname.startsWith("/shop");
  return pathname === href;
}

/**
 * Shared site header. `overHero` = homepage variant (120px logo, sits on the
 * hero photo); otherwise the inner-page variant (84px logo, bottom border).
 */
export default function Header({ overHero = false }: { overHero?: boolean }) {
  const pathname = usePathname();
  const { count, open } = useCart();
  const logoSize = overHero ? 120 : 84;

  return (
    <header className={`header container${overHero ? "" : " header--solid"}`}>
      <Link
        href="/"
        className="header-logo"
        style={{ width: logoSize, height: logoSize }}
        aria-label="Primo Vapes & Exotics — home"
      >
        <AnimatedLogo size={logoSize} priority />
      </Link>
      <nav className="nav" aria-label="Main">
        {navItems.map((n) => (
          <Link key={n.name} href={n.href} aria-current={isActive(n.href, pathname) ? "page" : undefined}>
            {n.name}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button type="button" className="icon-btn header-search" aria-label="Search">
          <SearchIcon />
        </button>
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
    </header>
  );
}
