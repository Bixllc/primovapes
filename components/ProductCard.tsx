"use client";

import Image from "next/image";
import { useCart } from "./CartProvider";
import { money, type Product } from "@/lib/data";

export default function ProductCard({ product: p }: { product: Product }) {
  const { cart, add, liked, toggleLike } = useCart();
  const qty = cart[p.id] ?? 0;
  const isLiked = !!liked[p.id];

  return (
    <article className="card">
      <div className="card-media">
        <Image src={p.image} alt={p.name} fill sizes="(max-width: 640px) 72vw, 280px" />
        <button
          type="button"
          className="heart"
          onClick={() => toggleLike(p.id)}
          aria-pressed={isLiked}
          aria-label={isLiked ? `Remove ${p.name} from saved` : `Save ${p.name}`}
        >
          {isLiked ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-body">
        <h3 className="card-name">{p.name}</h3>
        <div className="card-rating">
          <span className="stars" aria-label={`${p.rating} out of 5 stars`}>
            {"★".repeat(p.rating) + "☆".repeat(5 - p.rating)}
          </span>
          <span className="muted">({p.reviews})</span>
        </div>
        <div className="card-price">{money(p.price)}</div>
      </div>
      <button type="button" className="add-btn" data-added={qty > 0} onClick={() => add(p.id)}>
        {qty ? `Added · ${qty}` : "Add to Cart"}
      </button>
    </article>
  );
}
