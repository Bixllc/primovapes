"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/data";

export default function ProductRail({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="rail-wrap">
      <div ref={ref} className="rail no-scrollbar">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <button
        type="button"
        className="rail-next"
        aria-label="Scroll products"
        onClick={() => ref.current?.scrollBy({ left: ref.current.clientWidth * 0.5, behavior: "smooth" })}
      >
        →
      </button>
    </div>
  );
}
