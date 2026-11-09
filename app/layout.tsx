import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./pages.css";
import { CartProvider } from "@/components/CartProvider";
import { AuthProvider } from "@/components/AuthProvider";
import CartDrawer from "@/components/CartDrawer";
import AgeGate from "@/components/AgeGate";
import { AGE_KEY } from "@/lib/data";
import Footer from "@/components/Footer";

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
              <div className="announce-left">
                <span>Free shipping on orders $75+</span>
                <span className="sep">|</span>
                <span>Same-day local pickup</span>
                <span className="sep">|</span>
                <span className="hide-sm">100% authentic products</span>
                <span className="sep">|</span>
                <span>21+ only</span>
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
          <CartDrawer />
          <AgeGate />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
