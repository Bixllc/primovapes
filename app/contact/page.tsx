import type { Metadata } from "next";
import Header from "@/components/Header";
import { BagIcon, ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { StoreHours } from "@/components/StoreInfo";
import { store } from "@/lib/data";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Primo Vapes & Exotics",
  description: `Call ${store.phoneDisplay} or visit ${store.address}, ${store.cityStateZip}.`,
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="container page-intro">
        <h1 className="display-italic">
          Contact <span className="glow-pink">us.</span>
        </h1>
        <p className="intro-copy">
          Questions about a product, an order, or delivery? Call, stop by, or send a message and we&apos;ll get back to
          you.
        </p>
      </section>

      <section className="container info-cards" aria-label="Store info">
        <a href={store.phoneHref} className="info-card">
          <PhoneIcon />
          <span className="label">Call</span>
          <span className="info-value">{store.phoneDisplay}</span>
        </a>
        <a href={store.mapsUrl} target="_blank" rel="noopener noreferrer" className="info-card">
          <PinIcon />
          <span className="label">Visit</span>
          <span className="info-value">
            {store.address}
            <br />
            {store.cityStateZip}
          </span>
        </a>
        <div className="info-card">
          <ClockIcon />
          <span className="label">Hours · Open 7 days</span>
          <span className="info-value">
            <StoreHours />
          </span>
        </div>
        <a href="/#shop" className="info-card">
          <BagIcon />
          <span className="label">Order online</span>
          <span className="info-value">24/7 · Pickup or local delivery</span>
        </a>
      </section>

      <section className="container contact-grid">
        <ContactForm />
        <div className="map-frame">
          <iframe
            title={`Map of ${store.address}, ${store.cityStateZip}`}
            src={store.mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
