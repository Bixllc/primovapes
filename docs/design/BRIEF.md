# Prompt for Claude Code — Primo Vapes & Exotics homepage

Build a production homepage for **Primo Vapes & Exotics**, a smoke shop selling vapes, THC/hemp, tobacco, sexual-health products and accessories. Match the reference design (`Primo Vapes Home v2.dc.html`) exactly. Use the stack I specify (default: Next.js + React + Tailwind or CSS modules). Images are in `assets/` — copy them into `public/assets/`.

## Design tokens
- Font: **Google Sans** (400/500/600/700) from Google Fonts, fallback `system-ui, sans-serif`.
- Dark theme (default):
  - bg `#0A090B`, surface `#141215`, surface2 `#1D1A1F`
  - ink `#F5F1F4`, muted `#A79FA9`, line `#2A2530`
  - edge `rgba(255,46,147,.35)`, **pink `#FF2E93`**, on-pink `#FFFFFF`, announcement bar `#3A0A24`
- Light theme (optional toggle via `data-theme="light"`): bg `#F6F3F2`, surface `#FFFFFF`, surface2 `#EEE9E8`, ink `#161317`, muted `#5F5A61`, line `#E2DCDA`, pink `#D3166D`, bar `#D3166D`.
- Links: pink, hover → ink. No underline.
- Container: max-width 1400px, horizontal padding 28px.
- Headings: weight 700, letter-spacing −0.03em, line-height ~0.95–1, UPPERCASE. Section H2 = 48px; promo/visit H2/H3 = 44px.
- Eyebrows: 12px, weight 600, letter-spacing .2em, uppercase, pink.
- Radius: cards 10px, inner images 8px, buttons pill (999px).
- Hide scrollbars on horizontal scrollers.
- Respect `prefers-reduced-motion` (disable logo animations).

## Page structure (top → bottom)

### 1. Announcement bar
Background `--bar`, white, 12px, weight 500, uppercase, letter-spacing .03em, padding 9px.
Left: `Free shipping on orders $75+ | Same-day local pickup | 100% authentic products | 21+ only` (separators at 40% opacity).
Right (normal case, 13px): `Track Order | Contact`.

### 2. Hero (with header overlaid)
- Full-bleed `assets/hero-night.png`, `object-fit: cover`, `object-position: 68% 50%`. Min-height `clamp(520px, 48vw, 720px)`.
- Overlays: horizontal gradient `rgba(10,9,11,.92) 0% → .7 34% → 0 60%`, plus vertical gradient `.55 top → 0 22% → 0 75% → .9 bottom`, plus a 240px top darkening band (`.92 → .75 → 0`) so the nav is readable.
- **Header** (on top of the hero, z-index above overlays), padding 18px 28px, gap 36px:
  - Logo: `assets/primo-logo.png`, 120×120, circular. **Animated**: (a) neon pulse — a 5s infinite `drop-shadow` keyframe with pink `rgba(255,60,160,.55)` and teal `rgba(80,220,230,.25)` glow, with a brief flicker around 92–96%; (b) smoke puffs — 4 pink puffs from (14%, 20%) and 4 teal puffs from (87%, 30%), radial-gradient blurred circles that scale from 0.35→2.4, drift upward/outward, rotate ±40°, fade out, 3.6–4.8s staggered loops.
  - Nav (14px, weight 500, horizontal scroll if overflowing): Home (active: pink + 2px pink bottom border), Vapes, THC, Hookah, Glass, Roll, Munchies, Drinks, Accessories, Brands, Deals. Hover → pink.
  - Right: three 44×44 **icon buttons** (no text): Search (magnifier), Account (person), Cart (shopping bag) with a pink 18px pill count badge in the top-right corner. Stroke icons, 22px, stroke-width 1.8.
- Hero copy (vertically centered, left aligned, gap 24px):
  - Eyebrow: `Premium products. Good vibes.` — 13px, letter-spacing .32em, `#CFC6CF`.
  - H1: `More than a shop, it's a vibe.` — `clamp(48px, 6vw, 96px)`, max-width 11ch; "it's a vibe." in pink with `text-shadow: 0 0 28px rgba(255,46,147,.45)`.
  - Paragraph: `Vapes, exotics, hookah, glass, munchies and more. Everything you need, all in one place.` — 18px, `#DCD4DB`, max-width 26em.
  - CTA: `Shop now →` pink pill, 56px tall, uppercase, pink glow shadow; hover → white bg, dark text.

### 3. Shop by category
- H2 `Shop by category` ("category" pink), margin-bottom 20px, section padding-top 40px.
- Single row of **6 tiles**, equal flex, min-width 130px, aspect 4/5, gap 12px, horizontally scrollable on small screens. Border `--edge`, hover → pink border + pink glow.
- Each tile: full-cover photo, bottom gradient to `rgba(10,9,11,.88)`, label (14px, 700, uppercase) left and a 26px circular outlined `→` right.
- Tiles + images: Vapes `cat-vapes.png`, THC `cat-thc.png`, Hemp `cat-hemp.png`, Sexual Health `cat-sexual-health.png`, Tobacco `cat-tobacco.png`, Accessories `cat-accessories.png`. Clicking filters/links to that category.

### 4. Perks strip
5-column auto-fit grid (min 200px) with top/bottom 1px `--line` borders. Each: 36px pink-ringed circle with an 8px pink dot, title (13px 700 uppercase) + subtitle (13px muted):
Fast shipping / Orders $75+ · Local pickup / Same day · Authentic products / Top brands only · Exclusive deals / Weekly drops · Discreet packaging / Always private.

### 5. Primo picks (product rail)
- Header row: H2 `Primo picks` ("picks" pink); right: `View all products →` (14px, 600, underlined, offset 4px).
- Show **exactly 5 products** in one row on desktop (`grid-auto-columns: minmax(220px, calc((100% - 64px)/5))`, gap 16px, horizontal scroll-snap on smaller screens). Optional circular `→` next-scroll button on the right edge (44px).
- Card: surface bg, 1px line border, radius 10, padding 12. Square image (radius 8, `object-fit: cover`), heart save toggle top-right (♡ / pink ♥), name (15px 600), stars `#F5B81C` + review count (muted), price (18px 700), full-width `Add to Cart` button (42px, radius 8, pink). After adding → button turns ink bg / bg-colored text and reads `Added · {qty}`.
- Products (prices/ratings are placeholders — confirm with client):
  1. Black & Mild Cream — $8.99 — ★5 (143) — `prod-black-mild-cream-v2.png`
  2. Backwoods Singles — $2.49 — ★5 (176) — `prod-backwoods-singles.png`
  3. Fume Extra Mint Ice — $14.99 — ★5 (152) — `prod-fume-extra-mint-ice.png`
  4. Dutch Masters Palma 2pk — $2.29 — ★4 (98) — `prod-dutch-masters-palma.png`
  5. Grabba Leaf Whole-Leaf — $4.99 — ★5 (121) — `prod-grabba-leaf.png`

### 6. Promo banners
Two side-by-side cards (auto-fit, min 480px, gap 16px), min-height 260px, radius 10, border `rgba(255,46,147,.5)`. Full-cover photo with left-to-right dark gradient (`.85 → .4 at 50% → 0 at 75%`). Copy left, vertically centered, padding 28×32, gap 12:
- **Card A** — image `promo-exotic-flower.png` (object-position 75% 35%). Eyebrow `Top shelf`; H3 `Exotic` / `THCa flower` (second line pink); sub `Fresh drops. Premium quality.` (13px 600, letter-spacing .18em, uppercase); pink pill CTA `Shop flower →` (44px).
- **Card B** — image `promo-vapes.png` (object-position 75% 40%). H3 `Vapes &` / `disposables` (second line pink); sub `Your favorite brands.`; CTA `Shop vapes →`.

### 7. Order online / pickup
Full-width card (surface bg, 1px line border, radius 10, padding 36, gap 20):
- Top row: eyebrow `Order online, skip the line` (pink) left; pink shopping-bag outline icon (26px) right.
- H2 `In. Out. Done.` (44px).
- 3-column step grid (gap 10): each step = number (28px, 600, pink) → 3px pink bar → label (13px, 500, letter-spacing .1em, uppercase):
  `01 Order online` · `02 We prepare` · `03 Pick it up / Delivery`.
- Note: `Bring a valid ID — 21+ only.` (14px muted).
- 2-col info: **Address** (Store address / City, State ZIP) and **Hours** (Mon–Sun / Store hours) — small muted uppercase labels. *Placeholders — get real info.*
- Buttons: `Get directions` (pink pill, 48px) and `Call the shop` (outlined pill).

### 8. Footer
Surface bg, top border, margin-top 64px. Auto-fit grid (min 180px, gap 32):
- Animated logo (96px) + `Primo Vapes & Exotics / Smoke shop` (muted).
- Columns — **Shop**: Vapes, THC, Hookah, Glass, Deals · **Help**: Track order, Shipping, Returns, Contact · **Store**: Hours & location, Instagram, Age policy.
- Newsletter: `Deals in your inbox` + pill email input with pink `Join` button.
- Legal bar (12px muted): "Products are intended for adults 21+. Not for use by minors, pregnant or nursing women. These statements have not been evaluated by the FDA. © 2026 Primo Vapes & Exotics."

## Interactive behavior
- **Age gate** (21+): full-screen overlay `rgba(5,4,6,.88)` on first visit. Card with 160px animated logo, `Are you 21 or older?`, `You must be of legal age to enter this site.`, `Yes, enter` (pink) and `No` (outlined, leaves site). Store the answer in `localStorage` (`primo-age = 1`).
- **Cart**: global state with add/increment/decrement/remove. Header badge shows total qty. Clicking cart opens a right slide-over drawer (max 420px, backdrop `rgba(0,0,0,.6)` that closes it): `Your cart` title + close ×, line items with −/qty/+ and line totals, empty state `Nothing here yet.`, subtotal, shipping note (≥$75: "You qualify for free shipping." else "Add $X more for free shipping — or pick up free today."), pink `Checkout` pill.
- **Save/heart** toggle per product.
- Category tiles and nav link to category/shop routes.

## Responsive
- Nav scrolls horizontally on narrow widths; consider a hamburger below ~900px.
- Category row and product rail scroll horizontally with snap on mobile.
- Promo cards and visit section stack to one column under ~520px.
- Minimum tap targets 44px.

## Assets (from `assets/`)
`primo-logo.png`, `hero-night.png`, `cat-vapes.png`, `cat-thc.png`, `cat-hemp.png`, `cat-sexual-health.png`, `cat-tobacco.png`, `cat-accessories.png`, `prod-black-mild-cream-v2.png`, `prod-backwoods-singles.png`, `prod-fume-extra-mint-ice.png`, `prod-dutch-masters-palma.png`, `prod-grabba-leaf.png`, `promo-exotic-flower.png`, `promo-vapes.png`.

## Still needed from client
Real store address, hours, phone, product prices/ratings, PRIMO wordmark logo (if different from the round logo).
