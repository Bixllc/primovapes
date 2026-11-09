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
| `app/layout.tsx` | Announcement bar, footer, cart drawer, age gate, fonts |
| `app/globals.css` | Design tokens (dark + `data-theme="light"`) and all styles |
| `components/` | Header, animated logo, cart provider/drawer, age gate, product card/rail, footer |
| `lib/data.ts` | Products, categories, nav, store info: **edit content here** |
| `public/assets/` | Images from the design bundle |
| `docs/design/` | Original design brief and reference HTML |

## Behavior

- **Age gate:** server-rendered overlay. Accepting stores `primo-age=1` in localStorage. An inline head script hides the gate before first paint for returning visitors.
- **Cart and saved items:** React context, persisted to localStorage (`primo-cart`, `primo-liked`).
- Logo animations are disabled under `prefers-reduced-motion`.

## Still needed from the client

These are placeholders in `lib/data.ts`:
- Real store address, hours, phone and directions link
- Product prices and ratings
- PRIMO wordmark logo, if it differs from the round logo

The site also still needs:
- Checkout / payments (the Checkout button is a stub)
- Newsletter provider (footer form only shows a confirmation)
- Search and account (the header icons are not wired up yet)
