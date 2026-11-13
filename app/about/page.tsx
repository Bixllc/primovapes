import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import Header from "@/components/Header";
import { StoreAddress, StoreHours, StoreRating } from "@/components/StoreInfo";
import { store } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Primo Vapes & Exotics",
  description: "Built by the crew. Made for the culture. Meet the founders of Primo Vapes & Exotics in Fort Lauderdale.",
};

// Show a labeled frame until the design-bundle image is added to public/assets.
const hasAsset = (file: string) => existsSync(path.join(process.cwd(), "public", "assets", file));

const founders = [
  {
    name: "Boss C",
    photo: "/assets/founder-bossc-cutout.png",
    photoSize: [298, 448],
    role: "Co-owner",
    tail: 84,
    tilt: -1.5,
    bio: "Boss C brings extensive experience in business management, operations, marketing, branding, and customer relations. His focus has been on helping build the Primo brand, developing business systems, expanding community outreach, and creating the customer experience that defines Primo today.",
  },
  {
    name: "Primo",
    photo: "/assets/founder-primo-cutout.png",
    photoSize: [360, 418],
    role: "Founder & co-owner",
    tail: 47,
    tilt: 1,
    bio: "As the founder and co-owner of Primo Vapes & Exotics, Primo's vision inspired the creation of the brand. His passion for the industry and commitment to providing quality products helped establish the foundation of what Primo represents today.",
  },
  {
    name: "Bo",
    photo: "/assets/founder-bo-cutout.png",
    photoSize: [360, 468],
    role: "Co-owner & business partner",
    tail: 12,
    tilt: -1,
    bio: "As co-owner and business partner, Bo contributes leadership, operational expertise, and a strong commitment to customer satisfaction. His dedication to the day-to-day growth of the company has helped transform Primo from an idea into a thriving business.",
  },
];

// Rising smoke wisps for the visit card: 5 white from bottom-left, 5 pink from bottom-right.
const wisps = [0, 1].flatMap((side) =>
  [0, 1, 2, 3, 4].map((i) => ({
    key: `${side}-${i}`,
    style: {
      left: side ? `${78 + i * 4}%` : `${4 + i * 4}%`,
      width: 160 + i * 30,
      height: 110 + i * 20,
      background: side
        ? "radial-gradient(ellipse, rgba(255,46,147,.55) 0%, rgba(255,46,147,.18) 45%, rgba(255,46,147,0) 70%)"
        : "radial-gradient(ellipse, rgba(255,255,255,.4) 0%, rgba(255,255,255,.12) 45%, rgba(255,255,255,0) 70%)",
      "--drift": `${(side ? 1 : -1) * (40 + i * 18)}px`,
      animationDuration: `${7 + (i % 4)}s`,
      animationDelay: `${i * 1.6 + side * 0.8}s`,
    } as CSSProperties,
  })),
);

export default function AboutPage() {
  const heroReady = hasAsset("about-hero-lounge.png");
  const foundersReady = hasAsset("founders.png");

  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero about-hero">
        {heroReady ? (
          <Image
            src="/assets/about-hero-lounge.png"
            alt="Neon crown lounge inside Primo Vapes & Exotics"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "60% 50%" }}
          />
        ) : (
          <div className="asset-missing asset-missing--hero">about-hero-lounge.png</div>
        )}
        <div className="about-hero-shade" />
        <div className="hero-topband" />
        <Header overHero />
        <div className="container hero-copy about-hero-copy">
          <div className="hero-eyebrow">About Primo</div>
          <h1>
            Built by the crew. <span>Made for the culture.</span>
          </h1>
          <p>Quality products. Good people. A shopping experience built around the culture.</p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="container section story">
        <h2 className="h2">
          Primo <span className="pink">vibes</span> only.
        </h2>
        <div className="story-copy">
          <p>
            Welcome to Primo Vapes &amp; Exotics, where premium products, exceptional customer service, and community
            come together under one roof. Located in the heart of Fort Lauderdale, Primo was built to be more than just a
            smoke shop—it was created to be a destination where customers can find quality products, connect with
            like-minded people, and enjoy an atmosphere unlike any other.
          </p>
          <p>
            What started as a shared vision between three entrepreneurs has grown into one of the area&apos;s
            fastest-growing smoke shop experiences.
          </p>
        </div>
      </section>

      {/* ── Ask for Primo ── */}
      <section className="container section" aria-labelledby="crew-title">
        <h2 id="crew-title" className="h2">
          Ask for <span className="glow-pink">Primo.</span>
        </h2>
        <div className="bubbles no-scrollbar">
          {founders.flatMap((f) => [
            <article key={f.name} className="bubble" style={{ transform: `rotate(${f.tilt}deg)` }}>
              <h3 className="bubble-name">{f.name}</h3>
              <span className="bubble-role">{f.role}</span>
              <p>{f.bio}</p>
              <svg className="bubble-tail" style={{ left: `${f.tail}%` }} width="34" height="30" viewBox="0 0 34 30" aria-hidden>
                <path d="M2 0 L17 27 L32 0 Z" fill="#fff" />
                <path d="M2 0 L17 27 L32 0" fill="none" stroke="#0A090B" strokeWidth="3" strokeLinejoin="round" />
              </svg>
            </article>,
            // Mobile only: each founder's portrait sits under their own bubble tail
            foundersReady && (
              <figure key={`${f.name}-photo`} className="founder-portrait">
                <Image src={f.photo} alt={`Illustration of ${f.name}`} width={f.photoSize[0]} height={f.photoSize[1]} sizes="180px" />
              </figure>
            ),
          ])}
        </div>
        <div className="founders-frame">
          {foundersReady ? (
            <Image
              src="/assets/founders.png"
              alt="Illustration of Primo's founders: Boss C, Primo and Bo"
              width={1810}
              height={652}
              sizes="(max-width: 1400px) 100vw, 1344px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          ) : (
            <div className="asset-missing asset-missing--founders">founders.png</div>
          )}
        </div>
      </section>

      {/* ── Partnership ── */}
      <section className="container section partnership">
        <div className="eyebrow">Our story</div>
        <h2 className="h2">
          Built on <span className="pink">partnership</span>
        </h2>
        <p>
          Primo Vapes &amp; Exotics was founded through the partnership of three individuals who each brought unique
          skills, experience, and dedication to the business. As equal partners, Boss C, Primo, and Bo share the
          responsibility of growing the business, supporting the community, and creating an unforgettable experience for
          every customer who walks through the door.
        </p>
      </section>

      {/* ── Visit CTA ── */}
      <section className="container section">
        <div className="visit-cta">
          <div className="smoke" aria-hidden>
            {wisps.map((w) => (
              <span key={w.key} className="wisp" style={w.style} />
            ))}
          </div>
          <div className="visit-cta-copy">
            <div className="eyebrow">Visit us</div>
            <h2 className="h2 display-italic-h2">
              Come experience <span className="glow-pink">Primo.</span>
            </h2>
            <div className="visit-cta-info">
              <div>
                <div className="label">Address</div>
                <StoreAddress />
              </div>
              <div>
                <div className="label">Hours</div>
                <StoreHours />
              </div>
              <div>
                <div className="label">Phone</div>
                <a href={store.phoneHref} className="plain-link">
                  {store.phoneDisplay}
                </a>
                <div style={{ marginTop: 4 }}>
                  <StoreRating />
                </div>
              </div>
            </div>
            <div className="visit-actions">
              <Link href="/#shop" className="pill pill-pink">
                Shop now →
              </Link>
              <Link href="/account?view=signup" className="pill pill-outline-white">
                Join the club
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
