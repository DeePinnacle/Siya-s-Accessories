# Siya's Accessories — Pages & Home Sections

> Companion to `AGENT.md`. If the two ever conflict, `AGENT.md` wins. V1 is a **single-page site**.

---

## 1. Pages to Build

| Route | File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Home/landing page. Contains all site content (see §2). |
| 404 | `src/app/not-found.tsx` | Branded "page not found" with a button back home and a WhatsApp link. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Generated sitemap. |
| `/robots.txt` | `src/app/robots.ts` | Generated robots file linking the sitemap. |
| `/opengraph-image` | `src/app/opengraph-image.*` or `public/og.jpg` | 1200×630 social share image (logo on navy). |

### Not in V1
Product detail pages, separate About/Contact pages, blog, cart, checkout, accounts, search, privacy/terms pages. Adding any of these is a scope change and requires updating `AGENT.md` §11, §26 and §27.

---

## 2. Home Page Sections (in order)

| # | Section | Component | Anchor | Notes |
|---|---|---|---|---|
| 1 | Announcement bar | `AnnouncementBar.tsx` | — | One line, e.g. "Order easily on WhatsApp", with a "Chat now" link. No fake promos. |
| 2 | Navbar (sticky) | `Navbar.tsx` | — | Logo, anchor links, WhatsApp button, mobile slide-in menu. Transparent over hero, solid after scroll. |
| 3 | Hero | `Hero.tsx` | `#home` | H1, subtext, **Order on WhatsApp** + **Browse collection**, main image. |
| 4 | Shop by Category | `Categories.tsx` | `#categories` | Tiles: Earrings, Necklaces, Bracelets, Rings, Hair Accessories (Perfumes only if confirmed). Selecting one filters the product grid. |
| 5 | Featured Products | `FeaturedProducts.tsx` | `#shop` | Category tabs + product grid. Each card has **Order on WhatsApp**. |
| 6 | About | `About.tsx` | `#about` | Short brand story from the brand description only. |
| 7 | Why Choose Siya's Accessories | `WhyChoose.tsx` | — | Trendy styles · Affordable pieces · Easy ordering on WhatsApp. |
| 8 | How to Order | `HowToOrder.tsx` | `#how-to-order` | 3 steps: pick a piece, tap WhatsApp, confirm details in chat. |
| 9 | Testimonials | `Testimonials.tsx` | `#testimonials` | **Render only if real, client-approved quotes exist.** Otherwise omit the section and its nav link. |
| 10 | FAQ | `Faq.tsx` | `#faq` | Accessible accordion. Placeholder questions; no unconfirmed delivery/payment claims. |
| 11 | Contact | `Contact.tsx` | `#contact` | WhatsApp (primary), call, email, location text, socials if provided. No form. |
| 12 | Footer | `Footer.tsx` | — | Logo, tagline, links, contact, socials, copyright. |

### Global element
- **Floating WhatsApp button** (`FloatingWhatsApp.tsx`): appears after ~300px of scroll, hides while the Contact section is in view.

---

## 3. Navbar Links

| Label | Target |
|---|---|
| Shop | `#shop` |
| About | `#about` |
| How to Order | `#how-to-order` |
| FAQ | `#faq` |
| Contact | `#contact` |
| *Testimonials* | `#testimonials` — only if the section exists |

Right side: **Order on WhatsApp** button.

---

## 4. CTA Map

| Location | Primary CTA | Secondary |
|---|---|---|
| Announcement bar | Chat now | — |
| Navbar | Order on WhatsApp | — |
| Hero | Order on WhatsApp | Browse collection |
| Product cards | Order on WhatsApp (prefilled with product name) | — |
| How to Order | Start your order on WhatsApp | — |
| Contact | WhatsApp | Call, Email |
| Floating button | Chat on WhatsApp | — |

---

## 5. Build Order (suggested)

1. Project setup, design tokens, fonts, `siteConfig`, types
2. `lib/whatsapp.ts`, `lib/format.ts`, `WhatsAppButton`
3. Navbar, Hero, Footer
4. Categories + Featured Products (with placeholder data)
5. About, Why Choose, How to Order
6. FAQ, Contact, Testimonials (conditional)
7. Floating WhatsApp button, motion polish
8. 404 page, SEO metadata, JSON-LD, sitemap, robots, OG image
9. Accessibility, responsive and Lighthouse pass

---

## 6. Open Items Affecting Pages

- **Perfumes:** the category tile and tab render only if at least one perfume product exists.
- **Testimonials:** omitted until real quotes are supplied.
- **Delivery info:** no dedicated section; handled via FAQ and "ask on WhatsApp" copy until the client confirms details.
- **Socials:** shown only when real URLs are provided.
