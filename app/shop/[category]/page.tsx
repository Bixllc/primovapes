import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { categories, navItems, products } from "@/lib/data";

// Every slug reachable from the nav, the category tiles, or "View all".
const titles: Record<string, string> = { all: "All products" };
for (const n of navItems) if (n.href.startsWith("/shop/")) titles[n.href.slice(6)] = n.name;
for (const c of categories) titles[c.slug] = c.name;

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(titles).map((category) => ({ category }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return { title: `${titles[category] ?? "Shop"} — Primo Vapes & Exotics` };
}

export default async function ShopPage({ params }: Props) {
  const { category } = await params;
  const title = titles[category];
  if (!title) notFound();

  const list = category === "all" ? products : products.filter((p) => p.category === category);

  return (
    <main>
      <Header solid />
      <section className="container page-head">
        <div className="eyebrow">Shop</div>
        <h1 className="h2">{title}</h1>
      </section>
      <section className="container section" style={{ paddingTop: 24 }}>
        {list.length ? (
          <div className="product-grid">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">Products coming soon.</div>
        )}
      </section>
    </main>
  );
}
