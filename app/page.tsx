import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import ProductRail from "@/components/ProductRail";
import { BagIcon } from "@/components/Icons";
import { MembersSection } from "@/components/Membership";
import { StoreAddress, StoreHours } from "@/components/StoreInfo";
import { categories, perks, products, store } from "@/lib/data";

export default function Home() {
  return (
    <main>
      {/* ── Hero with overlaid header ── */}
      <section className="hero">
        <Image
          src="/assets/hero-night.png"
          alt="Fume disposable, Backwoods and Bob Marley papers on a marble table in a neon lounge"
          fill
          priority
          sizes="100vw"
          className="hero-img"
        />
        <div className="hero-shade" />
        <div className="hero-topband" />
        <Header overHero />
        <div className="container hero-copy">
          <div className="hero-eyebrow">Premium products. Good vibes.</div>
          <h1>
            More than a shop, <span>it&apos;s a vibe.</span>
          </h1>
          <p>Vapes, exotics, hookah, glass, munchies and more. Everything you need, all in one place.</p>
          <Link href="#shop" className="pill hero-cta">
            Shop now →
          </Link>
        </div>
      </section>

      {/* ── Shop by category ── */}
      <section className="container categories" aria-labelledby="cat-title">
        <h2 id="cat-title" className="h2">
          Shop by <span className="pink">category</span>
        </h2>
        <div className="cat-row no-scrollbar">
          {categories.map((c) => (
            <Link key={c.slug} href={`/shop/${c.slug}`} className="cat-tile">
              <Image src={c.image} alt="" fill sizes="(max-width: 640px) 42vw, 230px" />
              <div className="cat-label">
                <span>{c.name}</span>
                <span className="circle-arrow" aria-hidden>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Perks ── */}
      <section className="container perks-wrap" aria-label="Why shop with us">
        <ul className="perks">
          {perks.map((p) => (
            <li key={p.title} className="perk">
              <span className="perk-ring" aria-hidden />
              <div>
                <div className="perk-title">{p.title}</div>
                <div className="perk-sub">{p.sub}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Primo picks ── */}
      <section id="shop" className="container section" aria-labelledby="picks-title">
        <div className="rail-head">
          <h2 id="picks-title" className="h2">
            Primo <span className="pink">picks</span>
          </h2>
          <Link href="/shop/all">View all products →</Link>
        </div>
        <ProductRail products={products.slice(0, 5)} />
      </section>

      {/* ── Promo banners ── */}
      <section className="container promos" aria-label="Featured">
        <div className="promo" style={{ background: "#120B10" }}>
          <Image
            src="/assets/promo-exotic-flower.png"
            alt="Flower jar under neon pink lighting"
            fill
            sizes="(max-width: 1000px) 100vw, 680px"
            style={{ objectPosition: "75% 35%" }}
          />
          <div className="promo-shade" />
          <div className="promo-copy">
            <div className="eyebrow">Top shelf</div>
            <h3>
              Exotic
              <br />
              <span>THCa flower</span>
            </h3>
            <div className="promo-sub">Fresh drops. Premium quality.</div>
            <Link href="/shop/thc" className="pill promo-cta">
              Shop flower →
            </Link>
          </div>
        </div>
        <div className="promo" style={{ background: "#0B0D14" }}>
          <Image
            src="/assets/promo-vapes.png"
            alt="Lineup of disposable vapes with blue and pink smoke"
            fill
            sizes="(max-width: 1000px) 100vw, 680px"
            style={{ objectPosition: "75% 40%" }}
          />
          <div className="promo-shade" />
          <div className="promo-copy">
            <h3>
              Vapes &amp;
              <br />
              <span>disposables</span>
            </h3>
            <div className="promo-sub">Your favorite brands.</div>
            <Link href="/shop/vapes" className="pill promo-cta">
              Shop vapes →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Membership ── */}
      <MembersSection />

      {/* ── Order online / visit ── */}
      <section id="visit" className="container section" aria-labelledby="visit-title">
        <div className="visit-card">
          <div className="visit-top">
            <div className="eyebrow">Order online, skip the line</div>
            <BagIcon size={26} color="var(--pink)" />
          </div>
          <h2 id="visit-title" className="h2">
            In. Out. Done.
          </h2>
          <ol className="steps">
            {["Order online", "We prepare", "Pick it up / Delivery"].map((label, i) => (
              <li key={label} className="step">
                <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="step-bar" />
                <div className="step-label">{label}</div>
              </li>
            ))}
          </ol>
          <p className="visit-note">Bring a valid ID — 21+ only.</p>
          <div className="visit-info">
            <div>
              <div className="label">Address</div>
              <StoreAddress />
            </div>
            <div>
              <div className="label">Hours</div>
              <StoreHours />
            </div>
          </div>
          <div className="visit-actions">
            <a href={store.mapsUrl} className="pill pill-pink" target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
            <a href={store.phoneHref} className="pill pill-outline">
              Call the shop
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
