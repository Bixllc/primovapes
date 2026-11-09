"use client";

import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { FREE_SHIPPING_THRESHOLD, money, productById } from "@/lib/data";

export default function CartDrawer() {
  const { cart, subtotal, add, remove, isOpen, close } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const items = Object.entries(cart).flatMap(([id, qty]) => {
    const p = productById.get(id);
    return p ? [{ ...p, qty }] : [];
  });
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      <div className="backdrop" onClick={close} aria-hidden />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-head">
          <h2 id="cart-title" className="drawer-title">
            Your cart
          </h2>
          <button ref={closeRef} type="button" className="round-btn" onClick={close} aria-label="Close cart">
            ×
          </button>
        </div>
        <ul className="drawer-body">
          {items.length === 0 && <li className="drawer-empty">Nothing here yet.</li>}
          {items.map((it) => (
            <li key={it.id} className="line-item">
              <div className="line-item-info">
                <div style={{ fontWeight: 600 }}>{it.name}</div>
                <div className="qty">
                  <button type="button" onClick={() => add(it.id, -1)} aria-label={`Decrease ${it.name}`}>
                    −
                  </button>
                  <span aria-live="polite">{it.qty}</span>
                  <button type="button" onClick={() => add(it.id, 1)} aria-label={`Increase ${it.name}`}>
                    +
                  </button>
                </div>
                <button type="button" className="remove" onClick={() => remove(it.id)}>
                  Remove
                </button>
              </div>
              <div style={{ fontWeight: 700 }}>{money(it.price * it.qty)}</div>
            </li>
          ))}
        </ul>
        <div className="drawer-foot">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <div className="ship-note">
            {remaining <= 0
              ? "You qualify for free shipping."
              : `Add ${money(remaining)} more for free shipping — or pick up free today.`}
          </div>
          <button type="button" className="pill pill-pink checkout" disabled={items.length === 0}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
