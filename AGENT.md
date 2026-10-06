# Siya's Accessories — AGENT.md

> Implementation spec for a premium, mobile-first landing page. Read this fully before writing code.
> Where a decision is marked **OPEN**, use the stated default, keep it easy to change, and flag it in your final report. Never invent facts to fill a gap.

---

## 0. Open Decisions (use defaults, flag in final report)

| # | Decision | Default to use until confirmed |
|---|----------|-------------------------------|
| O1 | Is the apostrophe in "Siya's" part of the official brand name? | **Yes.** Write "Siya's Accessories" everywhere. Keep the brand name in one constant (`siteConfig.name`) so it is a one-line change. |
| O2 | Are perfumes sold? (Brief says "Jewellery & Perfume Store"; product list has no perfumes.) | Support a `perfumes` category in the data model, but **do not render the tab or any perfume copy unless at least one perfume product exists in data.** |
| O3 | Delivery: pickup / Lokoja / nationwide, fees | Not stated. Render the "Delivery" block as a **"Ask us on WhatsApp about delivery"** line only. Do not state fees, areas or timelines. Structure data so real values drop in later. |
| O4 | Exact address, walk-ins, opening hours, map | Show **"Lokoja, Kogi State, Nigeria"** only. No map embed, no hours. |
| O5 | Social handles (Instagram, TikTok, etc.) | Not provided. Social links are driven by `siteConfig.socials`; **render only entries that have a URL.** Do not guess handles. |
| O6 | Logo file | Use the supplied logo. Until a high-res SVG/PNG is provided, use the provided image and mark with `TODO: replace with SVG` in code. |
| O7 | Domain / canonical URL | Read from `NEXT_PUBLIC_SITE_URL`. Fall back to `http://localhost:3000` in dev. |
| O8 | Real product photos, names, prices, testimonials, FAQ answers | Not provided. Use clearly marked placeholders (see §13, §23). **No fake testimonials.** |
| O9 | Analytics | Click tracking is built in (§24). Load Google Analytics only if `NEXT_PUBLIC_GA_ID` is set. |

---

## 1. Project Overview

A single-page, mobile-first marketing and catalogue site for **Siya's Accessories**, a fashion accessories brand in Lokoja, Kogi State, Nigeria. Visitors browse products and tap **Order on WhatsApp**, which opens a WhatsApp chat with a prefilled message about the chosen product. Payment and delivery are arranged inside that chat.

- **Type:** catalogue-style landing page leading to WhatsApp (not an online store)
- **Version:** V1
- **Build model:** static front end, no backend, no database, no CMS

## 2. Brand Context

Siya's Accessories offers stylish, trendy, affordable accessories that help customers elevate their everyday look and express personal style.

**Products:** fashion jewellery, earrings, necklaces, bracelets, rings, hair accessories, other trendy accessories (and possibly perfumes, see O2).

**Contact (source of truth, keep in `siteConfig`):**

- Email: haseeyarh58@gmail.com
- WhatsApp / phone: 09061793607 (international: +234 906 179 3607)
- Location: Lokoja, Kogi State, Nigeria

## 3. Problem Statement

Customers currently have no single, polished place to see what Siya's Accessories sells and how to buy. Social posts are ephemeral and hard to browse by category. A branded page turns interest into direct WhatsApp conversations with minimal friction, and makes an affordable brand look premium.

## 4. Why This Website / Why Now

- Give the brand a credible home that can be shared as one link (bio links, WhatsApp status, flyers).
- Establish a visual identity derived from the client's logo.
- Lay a foundation that can grow into a fuller online store later without rework.

*(Specific launch trigger not provided. Do not invent one.)*

## 5. Business Goals

1. **Primary:** generate WhatsApp order enquiries.
2. Showcase the product range clearly by category.
3. Build brand credibility and recognition (premium feel, consistent identity).
4. Make contact effortless (WhatsApp, call, email).

## 6. Target Audience

*(Not specified by client. Working assumptions, pending confirmation.)*

- **Primary:** style-conscious women, mainly in their late teens to thirties, shopping on mobile.
- **Reach:** Lokoja and Kogi State first, but the page must not exclude buyers elsewhere in Nigeria.
- **Gift buyers:** anyone buying for someone else.
- **Positioning:** affordable luxury. Trendy, elegant, everyday-wearable.

## 7. User Goals

- "Show me what you sell, quickly."
- "Can I see prices?"
- "How do I order, and is it easy?"
- "Is this a real, trustworthy business?"
- "Can I just message someone?"

## 8. Success Criteria

Observable for V1:

| Metric | Target / check |
|--------|----------------|
| WhatsApp CTA clicks (hero, product, floating, contact) | Tracked per placement (§24) |
| Call and email taps | Tracked |
| Product-button clicks | Tracked with product ID |
| Social link clicks | Tracked |
| Lighthouse (mobile) | Performance, Accessibility, Best Practices, SEO each ≥ 90 |
| Core Web Vitals | LCP < 2.5s, CLS < 0.1, INP < 200ms on mid-range mobile |
| Functional | Every WhatsApp, tel and mailto link opens correctly on mobile and desktop |

No numeric sales targets were set by the client. Do not invent any.

---

## 9. Brand Identity

- **Name:** Siya's Accessories (see O1)
- **Positioning:** affordable luxury fashion accessories
- **Personality:** warm, friendly, polished, confident, feminine without being childish
- **Voice:** warm, friendly and polished. Short sentences. Plain English. No hype, no superlatives, no unverifiable claims.

### Colors

The logo is the source of truth. **Do not replace the two brand colors.**

| Token | Hex | Use |
|-------|-----|-----|
| `primary` | `#2939CE` | **Primary Brand Blue.** Main CTAs, links, key accents |
| `primary-hover` | `#2230B0` | Hover |
| `primary-active` | `#1A258F` | Pressed |
| `primary-soft` | `#EEF0FD` | Tinted backgrounds, selected states |
| `primary-border` | `#C9CEF3` | Borders on tinted surfaces |
| `navy` | `#050A30` | **Deep Navy.** Dark sections, footer, headings, body text |
| `background` | `#FAF9F6` | Page background (warm ivory neutral) |
| `surface` | `#FFFFFF` | Cards, inputs |
| `text` | `#050A30` | Body and headings |
| `text-muted` | `#4A5078` | Secondary text |
| `border` | `#E3E4EC` | Dividers, card borders |
| `success` | `#1E7A4C` | Success states only |
| `warning` | `#B54708` | Warning states only |
| `error` | `#B42318` | Error states only |

Rules:

- Blue + navy + ivory/white is the whole palette. **No purple, pink, neon green or other accent colors.**
- **The WhatsApp button uses brand blue with a WhatsApp icon, not WhatsApp green.** This keeps the identity consistent.
- At most one subtle gradient (navy to a slightly lighter navy) may be used on a dark section. No rainbow or mesh gradients.
- Verify contrast. `#2939CE` on white is about 8:1 and white on `#2939CE` passes AA for all text sizes.

### Typography direction

- **Headings:** elegant editorial serif, **Cormorant Garamond** (500/600), via `next/font/google`.
- **Body / UI:** clean humanist sans, **DM Sans** (400/500/700), via `next/font/google`.
- Do not use Inter or system defaults as the design font.
- If the logo's typeface is identified and a licensed match exists, prefer it for headings. Otherwise keep the pairing above.

### Logo usage

- Use the supplied logo in the navbar (left) and footer (on navy, use a light/white variant if available; otherwise place on a white pill).
- Keep clear space equal to the logo's cap height. Do not stretch, recolor, or add effects.
- Provide meaningful `alt="Siya's Accessories"`.

### Imagery direction

- Close, clean product photography with soft light and plain backgrounds, plus lifestyle shots (jewellery worn) where available.
- Consistent aspect ratios: **4:5** for product cards, **3:2 or 16:9** for hero and banners.
- If real photos are missing, use neutral placeholder tiles (ivory with a subtle blue-tinted icon and the text "Photo coming soon"). Never use stock photos of other brands' products.

### UI visual language

Editorial, spacious, quiet. Large serif headlines, generous whitespace, thin 1px borders, soft shadows, medium radius. It should read as a boutique, not as software.

---

## 10. UX Direction

- **First impression:** a calm, confident hero: brand name, one line of value, a product image, and one obvious button, **Shop on WhatsApp**.
- **Navigation:** sticky, minimal navbar (logo, 4 to 5 anchor links, WhatsApp button). On mobile, a clean slide-in menu with large tap targets.
- **Mobile:** primary experience. Thumb-reachable CTAs. 2-column product grid. Floating WhatsApp button.
- **Conversion journey:** land → browse categories → tap a product's **Order on WhatsApp** → WhatsApp opens with a prefilled message naming the product → customer completes order in chat.
- **Product discovery:** category tabs filter the grid instantly without a page reload.
- **Contact journey:** WhatsApp is always first. Call and email are secondary.
- **CTA hierarchy:**
  1. **Order on WhatsApp** (solid brand blue)
  2. **Browse collection** (outline / text link)
  3. Call, email, social (quiet text/icon links)

## 11. Information Architecture

Single page, anchor navigation, in this order:

1. Announcement bar
2. Navbar (sticky)
3. Hero
4. Shop by Category
5. Featured Products (with category tabs)
6. About
7. Why Choose Siya's Accessories
8. How to Order
9. Testimonials *(only if real ones are supplied; otherwise omit)*
10. FAQ
11. Contact
12. Footer
13. Floating WhatsApp button (global)

Excluded: newsletter, Instagram gallery, blog, separate pages, cart, checkout.

---

## 12. Section-by-Section Requirements

### 12.1 Announcement Bar
- **Purpose:** one line of useful info.
- **Content:** "Order easily on WhatsApp" (or a client-supplied promo). No fake sales.
- **Layout:** full-width, navy background, small centered text, dismissible optional.
- **CTA:** inline "Chat now" link to WhatsApp.
- **Responsive:** single line, truncates gracefully.
- **A11y:** text contrast AA; dismiss button has an accessible label if included.

### 12.2 Navbar
- **Purpose:** orientation and fast ordering.
- **Content:** logo; links: Shop, About, How to Order, FAQ, Contact; WhatsApp button.
- **Layout:** sticky. Transparent over hero at top, becomes solid ivory with a subtle border/shadow after ~24px of scroll.
- **Interaction:** smooth-scroll to anchors; active-section highlight; mobile menu slides in with focus trap and Escape to close.
- **A11y:** `<nav aria-label="Primary">`, hamburger is a real `<button aria-expanded aria-controls>`, visible focus rings, skip-to-content link.

### 12.3 Hero
- **Purpose:** state what the brand is and drive the first WhatsApp tap.
- **Content (placeholder, client to approve):**
  - Eyebrow: "Fashion Accessories · Lokoja"
  - H1: "Accessories that make every look yours."
  - Sub: "Trendy, affordable earrings, necklaces, bracelets, rings and more."
  - Primary CTA: **Order on WhatsApp**; secondary: **Browse collection** (scrolls to products).
- **Layout:** mobile: text first, then image below. Desktop: split layout, text left, large image right with an offset frame. Navy or ivory backdrop; no heavy gradient.
- **Interaction:** subtle staggered fade-up on load; gentle image parallax on desktop only.
- **A11y:** one `<h1>`. Hero image has meaningful alt or is decorative (`alt=""`) if redundant. Mark hero image `priority`.

### 12.4 Shop by Category
- **Purpose:** quick entry into the range.
- **Content:** tiles for Earrings, Necklaces, Bracelets, Rings, Hair Accessories (plus Perfumes only if O2 resolves yes).
- **Layout:** mobile: 2-column grid (or horizontal scroll-snap row). Desktop: 5-up row.
- **Interaction:** tap selects that category in the product grid and scrolls to it. Hover: slight image zoom.
- **A11y:** tiles are buttons/links with clear names; selected state conveyed by `aria-pressed`/`aria-current`, not color alone.

### 12.5 Featured Products
- **Purpose:** core catalogue and the main conversion surface.
- **Content:** product cards (see §13). Category tabs: All + each category with products.
- **Layout:** mobile 2 columns, tablet 3, desktop 4. Tabs are a horizontally scrollable pill row on mobile.
- **Interaction:** instant filtering with animated layout (`motion/react` `layout`/`AnimatePresence`). Empty state: "More pieces coming soon. Message us on WhatsApp to ask." 
- **CTA:** each card has **Order on WhatsApp**.
- **A11y:** tabs use `role="tablist"` pattern or buttons with `aria-pressed`; filtered list announced politely via `aria-live="polite"` result count.

### 12.6 About
- **Purpose:** humanize the brand.
- **Content:** 2 to 3 short paragraphs built only from the brand description in §2 (placeholder copy flagged for client edit).
- **Layout:** mobile stacked; desktop two columns (image + text).
- **CTA:** quiet link "Chat with us".

### 12.7 Why Choose Siya's Accessories
- **Purpose:** state benefits that are known to be true.
- **Content (only these three, no invented claims):** Trendy styles · Affordable pieces · Easy ordering on WhatsApp.
- **Layout:** three columns on desktop, stacked on mobile; thin-line icons (Lucide).
- **A11y:** icons decorative (`aria-hidden`).

### 12.8 How to Order
- **Purpose:** remove uncertainty.
- **Content:** 3 steps: 1) Browse and pick a piece. 2) Tap **Order on WhatsApp**. 3) Confirm details, payment and delivery in the chat.
- **Layout:** numbered steps; horizontal on desktop, vertical on mobile.
- **CTA:** **Start your order on WhatsApp**.

### 12.9 Testimonials
- **Render only if** `testimonials.length > 0` with real, client-approved quotes. Otherwise the section and its nav link do not exist.
- **Layout:** responsive grid (no carousel).

### 12.10 FAQ
- **Purpose:** answer objections.
- **Content (placeholder, answers must be confirmed by client):** How do I order? (WhatsApp, answerable now) · Do you deliver? ("Message us on WhatsApp to confirm delivery options for your location.") · How do I pay? ("We'll confirm payment options in the chat.") · Are product details and prices current? ("Message us to confirm availability.")
- **Layout:** accordion.
- **A11y:** accessible disclosure pattern (button + `aria-expanded` + region), keyboard operable, animated height respects reduced motion.

### 12.11 Contact
- **Purpose:** every route to the business.
- **Content:** WhatsApp (primary, large button), Call, Email, Location text "Lokoja, Kogi State, Nigeria", social icons (if any).
- **Layout:** card on navy background. Mobile: stacked large buttons.
- **No contact form in V1.**
- **A11y:** link text states purpose ("Call 0906 179 3607"), not "click here".

### 12.12 Footer
- **Content:** logo, short tagline, anchor links, contact links, socials, © year Siya's Accessories.
- **Layout:** navy background; 1 column mobile, 3 to 4 columns desktop.

### 12.13 Floating WhatsApp Button
- **Behavior:** fixed bottom-right (safe-area aware), appears after ~300px scroll, hidden when the Contact section is in view. Brand blue circle/pill with WhatsApp icon and label "Chat" on desktop.
- **A11y:** `aria-label="Chat with Siya's Accessories on WhatsApp"`, min 48×48px, doesn't cover essential content or the footer.

---

## 13. Product Presentation

**Card contents:**

- Image (4:5, `next/image`, lazy except above-the-fold)
- Name
- Category label (small, muted)
- Price in ₦ (formatted `₦12,500`); optional compare-at price shown struck through only when `compareAtPrice` exists
- Short description (1 line, optional)
- Availability badge, only when `availability` is `out_of_stock` ("Sold out") or `limited` ("Few left"). Default in-stock shows no badge.
- Button: **Order on WhatsApp**

**Behavior:**

- Whole card is not a link. Only the button is interactive, to avoid ambiguity. (Optional: tapping the image opens a simple lightbox, deferred unless requested.)
- If `price` is missing, show "Ask for price" and keep the WhatsApp button.
- If `out_of_stock`, the button label becomes "Ask about restock" and the message adapts.
- Hover (desktop): slight image zoom, soft shadow lift. No hover dependence on touch.

**Placeholders:** until real products exist, seed 6 to 8 items with names like "Product name", price "Ask for price", and the placeholder image tile. **Do not invent product names, materials (e.g. "gold-plated"), or prices.**

---

## 14. Conversion Strategy

- **Primary CTA:** Order on WhatsApp (solid brand blue, prominent in hero, every product card, How to Order, Contact, floating button, navbar).
- **Secondary CTAs:** Browse collection; Call; Email.
- **Not spammy:** the floating button appears only after scroll; the announcement bar is one line; the same button style is reused, not new loud variants. No popups, no exit-intent modals, no countdown timers.
- **Message prefill:**
  - General: `Hello Siya's Accessories, I'd like to make an enquiry.`
  - Product: `Hello Siya's Accessories, I'm interested in ordering the {Product Name}.`
  - Out of stock: `Hello Siya's Accessories, I'd like to ask about the {Product Name}. When will it be available?`

---

## 15. Design System

**Spacing:** 4px base scale (4, 8, 12, 16, 24, 32, 48, 64, 96). Section vertical padding: 64px mobile, 96 to 128px desktop. Container max-width 1200px, side padding 20px mobile / 32px desktop.

**Radius:** buttons and inputs `12px`; cards `16px`; pills/badges `9999px`; images inside cards `12px`.

**Shadows:** `sm: 0 1px 2px rgba(5,10,48,.06)`; `md: 0 8px 24px rgba(5,10,48,.08)` (card hover). No heavy or colored glows.

**Type scale (fluid via `clamp`):** H1 40→72px serif; H2 30→48px serif; H3 20→24px serif/sans; body 16→18px; small 14px. Line-height 1.6 body, 1.1 to 1.2 headings.

**Buttons:**
- *Primary:* `primary` bg, white text, hover/active tokens, radius 12, min height 48px.
- *Secondary:* transparent, 1px `primary` border, `primary` text.
- *Ghost/link:* underline on hover.
- *On navy:* white bg + navy text for primary, white outline for secondary.
- All: visible 2px focus ring (`primary`, 2px offset), disabled state clear.

**Cards:** surface bg, 1px `border`, radius 16, `sm` shadow, `md` on hover (desktop).

**Inputs (FAQ search or future use):** 48px height, 1px border, radius 12, focus ring.

**Icons:** Lucide, 1.5px stroke, 20 to 24px. Use a proper WhatsApp brand glyph (e.g. inline SVG), since Lucide has none.

**Navigation:** per §12.2.

**Badges:** pill, `primary-soft` bg with `primary` text (categories); `warning`-tinted for "Few left"; neutral for "Sold out".

**Product components:** `ProductCard`, `ProductGrid`, `CategoryTabs`, `PriceTag`, `WhatsAppButton`.

---

## 16. Responsive Design

Mobile-first. Design target **390px**; verify at 360 and 430.

| Breakpoint | Behavior |
|-----------|----------|
| **Mobile** (<640) | Single column sections; 2-col product grid; hamburger menu; stacked hero (text, then image); floating WhatsApp button; sticky nav compact |
| **Tablet** (640–1023) | 3-col products; hero may stay stacked or go split at ≥768; inline nav appears ≥768 |
| **Desktop** (1024–1439) | Split hero; 4-col products; full nav; hover effects enabled |
| **Large** (≥1440) | Container capped at 1200 to 1280px; larger type via clamp; no stretched full-bleed text |

Mobile must be designed deliberately (reordered content, larger tap targets ≥44px, category pills), not a scaled-down desktop.

---

## 17. Animation & Motion

**Library:** `motion/react` (import from `"motion/react"`).

**Level:** subtle and smooth.

**Approved:**
- Hero: staggered fade-up of eyebrow, headline, copy, buttons (≈0.5 to 0.7s, ease-out).
- Section reveal on viewport entry (`whileInView`, `once: true`, fade + 16 to 24px rise).
- Product card hover lift and image zoom (desktop).
- Category filtering: `layout` animation with `AnimatePresence`.
- Navbar background transition on scroll.
- Mobile menu slide/fade.
- FAQ accordion height/opacity.
- Floating button fade/scale in.
- Button press feedback (`whileTap` scale 0.98).

**Not allowed:**
- Autoplay carousels, marquee/ticker text, parallax on mobile
- Bouncing, shaking, pulsing attention-grabbers (including pulsing WhatsApp button)
- Scroll-jacking, custom cursors, page-load splash screens
- Animating layout-shifting properties that hurt CLS
- Any animation that delays access to content or CTAs

**Rules:** animate `transform` and `opacity` only where possible. Respect `prefers-reduced-motion` via `useReducedMotion()` or `MotionConfig reducedMotion="user"` at the root: reveals become instant or simple opacity fades, no parallax.

---

## 18. Accessibility

Target **WCAG 2.2 AA**.

- Semantic landmarks: `header`, `nav`, `main`, `section` with headings, `footer`.
- One `<h1>`; heading levels in order.
- Skip link to `#main`.
- Full keyboard operability, logical tab order, visible focus on every interactive element.
- Contrast ≥ 4.5:1 body, ≥ 3:1 large text and UI components; never rely on color alone.
- Touch targets ≥ 44×44px.
- Meaningful `alt` on product/logo images; decorative images `alt=""`.
- Buttons are `<button>`, links are `<a>`; external links with `rel="noopener noreferrer"`, and `target="_blank"` described for screen readers where used.
- Mobile menu and accordion expose state via ARIA; focus is managed (trap in menu, return on close).
- Respect `prefers-reduced-motion`.
- `lang="en-NG"` on `<html>`.
- Form-free V1 means no form errors to handle; if any input is added later, label it properly.

---

## 19. SEO

- **Title:** `Siya's Accessories | Trendy Fashion Jewellery & Accessories in Lokoja`
- **Meta description (≤160 chars):** `Shop trendy, affordable earrings, necklaces, bracelets, rings and hair accessories from Siya's Accessories in Lokoja, Kogi State. Order easily on WhatsApp.`
- **Keywords (for copy and headings, not stuffed):** jewellery in Lokoja, fashion accessories Lokoja, earrings Lokoja, necklaces Lokoja, affordable jewellery Nigeria.
- **Open Graph / Twitter:** `og:title`, `og:description`, `og:type=website`, `og:url`, `og:image` (1200×630, branded; generate with the logo on navy), `og:locale=en_NG`, `twitter:card=summary_large_image`.
- **Structured data (JSON-LD):** `LocalBusiness` (or `Store`) with name, url, telephone `+2349061793607`, email, `address` (`addressLocality: Lokoja`, `addressRegion: Kogi`, `addressCountry: NG`), logo, and `sameAs` for socials that exist. **Omit any property that has no real value** (hours, geo, price range).
- **Semantic HTML**, one H1, descriptive headings, descriptive link text.
- **Image alt text** descriptive and natural.
- **Local SEO:** mention Lokoja / Kogi naturally in H1 eyebrow, About, Contact and footer.
- **Files:** `app/sitemap.ts`, `app/robots.ts`, canonical via `metadataBase`.

## 20. Performance

- Lighthouse mobile ≥ 90 in all four categories.
- LCP image uses `priority`; all others lazy-load.
- Use `next/image` with explicit `sizes`, WebP/AVIF, width/height or `fill` in a sized container (prevent CLS).
- Source images ≤ ~200KB each after optimization; no raw phone photos committed.
- Fonts via `next/font` with `display: swap` and only needed weights/subsets.
- Keep client JS small: Server Components by default; client components only for interactivity (nav, tabs, FAQ, floating button, motion wrappers).
- No heavy libraries (no carousels, no UI kits). Import only used `motion/react` features.
- No layout shift from fonts, images, announcement bar or sticky nav.

---

## 21. Technology Stack

Approved stack (no additions without approval):

- **Next.js** (App Router, latest stable) with **TypeScript** (strict)
- **Tailwind CSS** (design tokens mapped in theme)
- **motion/react** for animation
- **lucide-react** for icons
- **next/font** for fonts, **next/image** for images
- *shadcn/ui:* **not used** unless a specific accessible primitive is needed (e.g. accordion). If needed, add only that component.
- No database, CMS, auth, payments, or form libraries.

**Hosting (approved default):** VPS with Cloudflare for DNS/SSL. Vercel is an acceptable alternative for a static site. Domain per O7. Store optimized images in `/public`; Cloudflare R2 is optional later.

**Env vars:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID` (optional).

## 22. Project Architecture

```
src/
  app/
    layout.tsx          # fonts, metadata, MotionConfig, JSON-LD, skip link
    page.tsx            # composes sections in order
    globals.css         # Tailwind layers, CSS variables (colors), base styles
    sitemap.ts
    robots.ts
    opengraph-image.*   # or static /public/og.jpg
  components/
    sections/
      AnnouncementBar.tsx
      Navbar.tsx
      Hero.tsx
      Categories.tsx
      FeaturedProducts.tsx
      About.tsx
      WhyChoose.tsx
      HowToOrder.tsx
      Testimonials.tsx
      Faq.tsx
      Contact.tsx
      Footer.tsx
    ui/
      Button.tsx
      Badge.tsx
      Container.tsx
      SectionHeading.tsx
      Reveal.tsx        # motion whileInView wrapper (reduced-motion aware)
      Accordion.tsx
    product/
      ProductCard.tsx
      ProductGrid.tsx
      CategoryTabs.tsx
      PriceTag.tsx
    common/
      WhatsAppButton.tsx
      FloatingWhatsApp.tsx
      WhatsAppIcon.tsx
      JsonLd.tsx
  data/
    site.ts             # siteConfig: name, contact, socials, nav links
    categories.ts
    products.ts
    faqs.ts
    testimonials.ts
    steps.ts
  lib/
    whatsapp.ts         # buildWhatsAppUrl(), message builders
    format.ts           # formatNaira()
    analytics.ts        # trackEvent()
    cn.ts
  types/
    index.ts            # Product, Category, Faq, Testimonial, SiteConfig
public/
  images/               # logo, products, hero, og
```

Content and data stay separate from UI. Components receive typed props or import from `data/`.

## 23. Content / Data Strategy

```ts
type CategoryId = 'earrings' | 'necklaces' | 'bracelets' | 'rings' | 'hair-accessories' | 'perfumes' | 'other';

interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price?: number;            // naira, integer; undefined => "Ask for price"
  compareAtPrice?: number;   // only if a real discount exists
  image: { src: string; alt: string };
  shortDescription?: string;
  availability?: 'in_stock' | 'limited' | 'out_of_stock'; // default in_stock
  featured?: boolean;
}

interface SiteConfig {
  name: string;              // "Siya's Accessories"
  url: string;
  whatsappNumber: string;    // "2349061793607" (digits only, intl format)
  phoneDisplay: string;      // "0906 179 3607"
  phoneTel: string;          // "+2349061793607"
  email: string;             // "haseeyarh58@gmail.com"
  location: string;          // "Lokoja, Kogi State, Nigeria"
  socials: { platform: 'instagram'|'tiktok'|'facebook'|'x'|'pinterest'; url: string }[];
}
```

- **Categories** derive from products: show a category tab/tile only if it has ≥1 product (except the core five, which may show with a "coming soon" state; use the empty-state rule in §12.5).
- **Testimonials:** `{ id, quote, name, location? }`. Only real, client-approved.
- **FAQs:** `{ id, question, answer }`. Answers must not assert delivery/payment facts not confirmed by the client.
- **Placeholder items** are tagged (e.g. `placeholder: true` internally) so they are easy to find and replace.
- Updating products in V1 means editing `data/products.ts` and redeploying.

## 24. Contact & WhatsApp Integration

- **WhatsApp:** `https://wa.me/2349061793607?text=<encodeURIComponent(message)>`. Convert local `09061793607` → `2349061793607` (drop leading 0, prefix 234). Opens in a new tab with `rel="noopener noreferrer"`. All links built by `lib/whatsapp.ts`; never hand-write them in components.
- **Phone:** `tel:+2349061793607`, displayed as "0906 179 3607". Tap-to-call on mobile.
- **Email:** `mailto:haseeyarh58@gmail.com` (optional prefilled subject "Enquiry from website").
- **Location:** plain text "Lokoja, Kogi State, Nigeria". No map, no address (O4).
- **Social:** icon links from `siteConfig.socials`, rendered only if present; open in new tab.
- **Tracking:** `trackEvent(name, { placement, productId? })` fires on click for `whatsapp_click`, `call_click`, `email_click`, `social_click`. Sends to GA only if `NEXT_PUBLIC_GA_ID` is set; otherwise no-op. No cookies/banner required without GA; if GA is enabled, flag consent needs in the final report.

## 25. SEO & Metadata (Implementation)

- Use the Next.js Metadata API in `layout.tsx` (`metadataBase`, title template, description, openGraph, twitter, icons, alternates.canonical).
- Inject JSON-LD via a `<script type="application/ld+json">` component using values from `siteConfig`.
- Generate `sitemap.xml` and `robots.txt` (allow all, link sitemap).
- Provide favicon and app icons derived from the logo.
- Validate with Rich Results Test and Lighthouse SEO before handoff.

---

## 26. Out of Scope (V1)

Cart · checkout · online payments · customer accounts · inventory management · admin dashboard · CMS · database · order tracking · reviews/ratings system · newsletter · contact form · Instagram feed embed · live chat widget · multi-page product detail pages · blog · search · wishlists · multi-language · map embed · discount/coupon engine.

## 27. Future Enhancements

- CMS or lightweight admin to manage products
- Product detail pages and image galleries
- Cart + WhatsApp "send my cart" message
- Online payments (e.g. Paystack/Flutterwave)
- Delivery calculator and fees
- Instagram gallery, reviews, newsletter
- Google Maps and opening hours (when physical location details are supplied)
- Analytics dashboard

Do not build any of these in V1.

---

## 28. Implementation Rules

1. Do not invent business claims, statistics, awards, materials, prices, product names, delivery terms or testimonials.
2. Do not introduce colors beyond §9. No purple, pink, neon green.
3. Do not over-engineer: no state libraries, no extra dependencies, no backend.
4. Do not build anything listed in §26.
5. Reuse components; keep content in `data/`, UI in `components/`.
6. All contact URLs come from `siteConfig` through `lib/whatsapp.ts`.
7. Mobile-first: write base styles for mobile, enhance upward.
8. Accessibility is a requirement, not polish (§18).
9. Optimize every image; always provide dimensions/`sizes`.
10. Keep the look editorial and boutique. Avoid SaaS patterns (feature grids with gradient icons, pricing tables, glassmorphism, big gradient blobs).
11. Animation must follow §17. Use `motion/react`, honor reduced motion.
12. Server Components by default; add `"use client"` only where needed.
13. Mark every placeholder clearly in code and in the UI where visible to users ("Photo coming soon"), and list all placeholders in the final report.
14. When something is unclear, use the default in §0 and report it. Do not stop to ask basic questions.
15. Final report must list: completed sections, placeholders, open decisions (§0), and any deviations.

## 29. Definition of Done

### Design
- [ ] Brand colors `#2939CE` and `#050A30` implemented as tokens and used correctly
- [ ] Logo placed in navbar and footer, undistorted
- [ ] Cormorant Garamond + DM Sans loaded and applied
- [ ] Layouts complete at 360, 390, 768, 1024, 1440
- [ ] Visual consistency across sections; no off-palette colors

### UX
- [ ] Primary CTA (Order on WhatsApp) obvious in hero and on every product
- [ ] WhatsApp links open with the correct number and correct prefilled message per product
- [ ] Call and email links work
- [ ] Navbar anchors scroll correctly; mobile menu works
- [ ] Category filtering works with sensible empty state
- [ ] Mobile experience reviewed on a real phone-size viewport

### Technical
- [ ] `build` succeeds; no TypeScript errors; lint clean
- [ ] No broken links; no console errors or hydration warnings
- [ ] Images optimized and sized; no layout shift
- [ ] No unneeded dependencies

### Accessibility
- [ ] Full keyboard navigation with visible focus
- [ ] Semantic landmarks and single H1
- [ ] Buttons/links accessible names; ARIA states on menu, tabs, accordion
- [ ] Alt text on all meaningful images
- [ ] Contrast verified
- [ ] Reduced-motion verified

### SEO
- [ ] Title, description, canonical set
- [ ] Open Graph and Twitter metadata with working image
- [ ] LocalBusiness JSON-LD valid, with no empty/invented fields
- [ ] `sitemap.xml` and `robots.txt` present
- [ ] Lokoja/Kogi local terms used naturally

### Performance
- [ ] Lighthouse mobile ≥ 90 across all categories
- [ ] LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Lazy loading on below-the-fold images
- [ ] Minimal client JS

### Handoff
- [ ] Placeholders and open decisions listed in the final report
- [ ] README explains how to edit `data/` files and set env vars
