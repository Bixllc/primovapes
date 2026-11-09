// Catalog + site content. Prices, ratings, address and hours are
// PLACEHOLDERS from the design brief — confirm with the client before launch.

export type CategorySlug =
  | "vapes"
  | "thc"
  | "hemp"
  | "sexual-health"
  | "tobacco"
  | "accessories";

export type Category = { slug: CategorySlug; name: string; image: string };

export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number; // 0–5
  reviews: number;
  image: string;
  category: CategorySlug;
};

export const FREE_SHIPPING_THRESHOLD = 75;

export const categories: Category[] = [
  { slug: "vapes", name: "Vapes", image: "/assets/cat-vapes.png" },
  { slug: "thc", name: "THC", image: "/assets/cat-thc.png" },
  { slug: "hemp", name: "Hemp", image: "/assets/cat-hemp.png" },
  { slug: "sexual-health", name: "Sexual Health", image: "/assets/cat-sexual-health.png" },
  { slug: "tobacco", name: "Tobacco", image: "/assets/cat-tobacco.png" },
  { slug: "accessories", name: "Accessories", image: "/assets/cat-accessories.png" },
];

export const products: Product[] = [
  { id: "black-mild-cream", name: "Black & Mild Cream", price: 8.99, rating: 5, reviews: 143, image: "/assets/prod-black-mild-cream-v2.png", category: "tobacco" },
  { id: "backwoods-singles", name: "Backwoods Singles", price: 2.49, rating: 5, reviews: 176, image: "/assets/prod-backwoods-singles.png", category: "tobacco" },
  { id: "fume-extra-mint-ice", name: "Fume Extra Mint Ice", price: 14.99, rating: 5, reviews: 152, image: "/assets/prod-fume-extra-mint-ice.png", category: "vapes" },
  { id: "dutch-masters-palma", name: "Dutch Masters Palma 2pk", price: 2.29, rating: 4, reviews: 98, image: "/assets/prod-dutch-masters-palma.png", category: "tobacco" },
  { id: "grabba-leaf", name: "Grabba Leaf Whole-Leaf", price: 4.99, rating: 5, reviews: 121, image: "/assets/prod-grabba-leaf.png", category: "tobacco" },
];

export const productById = new Map(products.map((p) => [p.id, p]));

export const navItems: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Vapes", href: "/shop/vapes" },
  { name: "THC", href: "/shop/thc" },
  { name: "Hookah", href: "/shop/hookah" },
  { name: "Glass", href: "/shop/glass" },
  { name: "Roll", href: "/shop/roll" },
  { name: "Munchies", href: "/shop/munchies" },
  { name: "Drinks", href: "/shop/drinks" },
  { name: "Accessories", href: "/shop/accessories" },
  { name: "Brands", href: "/shop/brands" },
  { name: "Deals", href: "/shop/deals" },
];

export const perks = [
  { title: "Fast shipping", sub: "Orders $75+" },
  { title: "Local pickup", sub: "Same day" },
  { title: "Authentic products", sub: "Top brands only" },
  { title: "Exclusive deals", sub: "Weekly drops" },
  { title: "Discreet packaging", sub: "Always private" },
];

export const store = {
  addressLine1: "Store address",
  addressLine2: "City, State ZIP",
  hoursLine1: "Mon–Sun",
  hoursLine2: "Store hours",
  phone: "", // e.g. "+15555555555"
  directionsUrl: "#",
};

export const footerCols = [
  {
    title: "Shop",
    links: [
      { name: "Vapes", href: "/shop/vapes" },
      { name: "THC", href: "/shop/thc" },
      { name: "Hookah", href: "/shop/hookah" },
      { name: "Glass", href: "/shop/glass" },
      { name: "Deals", href: "/shop/deals" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Track order", href: "#" },
      { name: "Shipping", href: "#" },
      { name: "Returns", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Store",
    links: [
      { name: "Hours & location", href: "/#visit" },
      { name: "Instagram", href: "#" },
      { name: "Age policy", href: "#" },
    ],
  },
];

export const money = (n: number) => `$${n.toFixed(2)}`;

// localStorage key for the 21+ age gate ("1" = confirmed).
export const AGE_KEY = "primo-age";
