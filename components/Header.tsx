"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedLogo from "./AnimatedLogo";
import { AccountIcon, BagIcon, SearchIcon } from "./Icons";
import { useCart } from "./CartProvider";
import { navItems } from "@/lib/data";

export default function Header({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const { count, open } = useCart();

  return (
    <header className={`header container${solid ? " header--solid" : ""}`}>
      <Link href="/" className="header-logo" aria-label="Primo Vapes & Exotics — home">
        <AnimatedLogo size={120} priority />
      </Link>
      <nav className="nav no-scrollbar" aria-label="Main">
        {navItems.map((n) => (
          <Link key={n.name} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
            {n.name}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button type="button" className="icon-btn" aria-label="Search">
          <SearchIcon />
        </button>
        <button type="button" className="icon-btn" aria-label="Account">
          <AccountIcon />
        </button>
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
