import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./pages.css";
import { CartProvider } from "@/components/CartProvider";
import { AuthProvider } from "@/components/AuthProvider";
import CartDrawer from "@/components/CartDrawer";
import AgeGate from "@/components/AgeGate";
import { AGE_KEY } from "@/lib/data";
import Footer from "@/components/Footer";

const announcements = [
  "Free shipping on orders $75+",
  "Same-day local pickup",
  "100% authentic products",
  "21+ only",
];
import MobileBar from "@/components/MobileBar";

export const metadata: Metadata = {
  title: "Primo Vapes & Exotics — More than a shop, it's a vibe",
  description:
    "Vapes, exotics, hookah, glass, munchies and more. Same-day local pickup, free shipping on orders $75+. 21+ only.",
};

export const viewport: Viewport = {
  themeColor: "#0A090B",
};

// Runs before first paint so returning 21+ visitors never see the gate flash.
const ageScript = `try{if(localStorage.getItem(${JSON.stringify(AGE_KEY)})==='1')document.documentElement.setAttribute('data-age-ok','')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ageScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
        <CartProvider>
          <div className="announce">
            <div className="container announce-inner">
              <div className="announce-left marquee">
                <p className="sr-only">{announcements.join(" · ")}</p>
                <div className="marquee-track" aria-hidden>
                  {/* Two identical halves; the track slides by exactly one half, so the loop is seamless */}
                  {[0, 1].map((half) => (
                    <div className="marquee-group" key={half}>
                      {[0, 1, 2].flatMap((rep) =>
                        announcements.map((text) => (
                          <span key={`${rep}-${text}`}>
                            {text}
                            <span className="sep">✦</span>
                          </span>
                        )),
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="announce-right">
                <a href="#">Track Order</a>
                <span className="sep">|</span>
                <a href="/contact">Contact</a>
              </div>
            </div>
          </div>
          {children}
          <Footer />
          <MobileBar />
          <CartDrawer />
          <AgeGate />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
