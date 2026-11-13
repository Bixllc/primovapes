# Primo Vapes & Exotics

Storefront for Primo Vapes & Exotics. Built with Next.js 16 (App Router), React 19, TypeScript, and plain CSS.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

## Layout

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Homepage (hero, categories, perks, Primo picks, promos, order-online) |
| `app/shop/[category]/page.tsx` | Category / "all products" listing |
| `app/account/` | Sign in, create account (with membership picker), member dashboard |
| `app/about/page.tsx` | About: hero, story, founders bubbles, partnership, visit CTA |
| `app/contact/` + `app/api/contact/route.ts` | Contact page, form and its endpoint |
| `lib/membership.ts` | Primo rewards tiers, perks and notes |
| `app/layout.tsx` | Announcement bar, footer, cart drawer, age gate, fonts |
| `app/globals.css` | Design tokens (dark + `data-theme="light"`) and all styles |
| `components/` | Header, mobile sticky bar, animated logo, cart provider/drawer, age gate, product card/rail, footer |
| `lib/data.ts` | Products, categories, nav, store info: **edit content here** |
| `public/assets/` | Images from the design bundle |
| `docs/design/` | Original design brief and reference HTML |

## Behavior

- **Age gate:** server-rendered overlay. Accepting stores `primo-age=1` in localStorage. An inline head script hides the gate before first paint for returning visitors.
- **Accounts (front-end only for now):** `components/AuthProvider.tsx` keeps accounts in the browser's localStorage so every flow can be reviewed. Passwords are not stored. Signing in with an email that has no account creates a demo Regular member with 140 points. Orders and addresses on the dashboard are sample data. Swap these for real API calls when the backend is chosen.
- **Contact form:** posts to `/api/contact`, which validates the message and only logs it on the server for now. It needs an email service or database to reach the shop.
- **About images:** `about-hero-lounge.png` and `founders.png` show a placeholder frame until they're added to `public/assets/`.
- **Cart and saved items:** React context, persisted to localStorage (`primo-cart`, `primo-liked`).
- **Mobile (≤900px):** one-row header (logo, nav, icons); a compact sticky copy slides in once it scrolls away. The announcement bar is a looping one-line ticker, the hero photo sits below the copy, and swipe rows run to the screen edges. Rules live in the responsive blocks at the end of `app/globals.css` and `app/pages.css`.
- Logo animations are disabled under `prefers-reduced-motion`.

## Still needed from the client

- Product prices and ratings (placeholders in `lib/data.ts`)
- Points thresholds/pricing for upgrading to Insider or Boss Card at signup
- Real footer link targets
- PRIMO wordmark logo, if it differs from the round logo

The site also still needs:
- Backend: real auth (email/password, Google, Apple), member tiers/points/referrals, orders, admin tier review
- Checkout / payments (the Checkout button is a stub)
- Newsletter provider (footer form only shows a confirmation)
- Search (the header search icon isn't wired up yet)
