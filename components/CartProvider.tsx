"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { productById } from "@/lib/data";

type Cart = Record<string, number>;

type CartContextValue = {
  cart: Cart;
  count: number;
  subtotal: number;
  add: (id: string, delta?: number) => void;
  remove: (id: string) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  liked: Record<string, boolean>;
  toggleLike: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "primo-cart";
const LIKED_KEY = "primo-liked";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore after mount so server and first client render match.
  useEffect(() => {
    const stored = load<Cart>(CART_KEY, {});
    // Drop anything no longer in the catalog.
    setCart(Object.fromEntries(Object.entries(stored).filter(([id, q]) => productById.has(id) && q > 0)));
    setLiked(load(LIKED_KEY, {}));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) save(CART_KEY, cart);
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) save(LIKED_KEY, liked);
  }, [liked, hydrated]);

  const add = useCallback((id: string, delta = 1) => {
    setCart((c) => {
      const next = { ...c };
      const q = Math.max(0, (next[id] ?? 0) + delta);
      if (q) next[id] = q;
      else delete next[id];
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCart(({ [id]: _, ...rest }) => rest);
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLiked((l) => ({ ...l, [id]: !l[id] }));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    let count = 0;
    let subtotal = 0;
    for (const [id, q] of Object.entries(cart)) {
      const p = productById.get(id);
      if (!p) continue;
      count += q;
      subtotal += p.price * q;
    }
    return {
      cart,
      count,
      subtotal,
      add,
      remove,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      liked,
      toggleLike,
    };
  }, [cart, liked, isOpen, add, remove, toggleLike]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
