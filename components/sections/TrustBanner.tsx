"use client";

import { Gem, Heart, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import { trustItems, type TrustIcon, type TrustItem } from "@/data/trust";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const icons: Record<TrustIcon, LucideIcon> = {
  gem: Gem,
  shield: ShieldCheck,
  truck: Truck,
  heart: Heart,
};

/**
 * Berry band placed directly under "Shop by Category".
 * Colour comes from CSS variables (--color-banner, --color-banner-deep), so
 * switching to the AGENT.md navy/blue palette is a one-line change in globals.css.
 */
export function TrustBanner() {
  return (
    <section
      id="highlights"
      aria-label="Why shop with Siya's Accessories"
      className="bg-navy from-[var(--color-banner)] to-[var(--color-banner-deep)] text-white"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:py-12">
        <motion.ul
          className="grid grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          {trustItems.map((item, index) => (
            <TrustCell key={item.id} item={item} index={index} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function TrustCell({ item, index }: { item: TrustItem; index: number }) {
  const Icon = icons[item.icon];

  // Dividers: mobile is a 2x2 grid (vertical divider on the right column,
  // horizontal divider above the second row). Desktop is a single row with
  // a vertical divider before every item except the first.
  const dividers = cn(
    index % 2 === 1 && "border-l border-white/25",
    index >= 2 && "border-t border-white/25",
    "lg:border-t-0",
    index === 0 ? "lg:border-l-0" : "lg:border-l lg:border-white/25",
  );

  const content = (
    <>
      <Icon aria-hidden className="size-9 shrink-0" strokeWidth={1.5} />
      <span className="mt-4 block text-[15px] font-medium leading-snug sm:text-base">
        {item.title}
      </span>
      <span className="mt-1 block text-[13px] leading-snug text-white/85 sm:text-sm">
        {item.subtitle}
      </span>
    </>
  );

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      className={cn("flex", dividers)}
    >
      {item.whatsappMessage ? (
        <a
          href={buildWhatsAppUrl(item.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { placement: "trust-banner" })}
          className={cn(
            "group flex min-h-[44px] w-full flex-col items-center px-3 py-6 text-center transition-colors lg:py-2",
            "hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white",
          )}
        >
          <span className="sr-only">Opens WhatsApp in a new tab. </span>
          {content}
        </a>
      ) : (
        <div className="flex w-full flex-col items-center px-3 py-6 text-center lg:py-2">
          {content}
        </div>
      )}
    </motion.li>
  );
}