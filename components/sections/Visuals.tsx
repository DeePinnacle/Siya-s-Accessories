import { CircleDot, CreditCard, BadgeCheck, Check, Flower2, Gem, Heart, Menu, Send, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site";
import { confirmChecklist, miniCategories } from "@/data/steps";
import { whatsappMessages } from "@/lib/whatsapp";

/* Decorative illustrations for the How to Order steps.
   Everything here is aria-hidden: the step title and description carry the meaning. */

const miniIcons = {
  sparkles: Sparkles,
  heart: Heart,
  circle: CircleDot,
  gem: Gem,
  flower: Flower2,
} as const;

function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto w-full max-w-[176px] overflow-hidden rounded-[28px] border-[5px] border-navy bg-surface shadow-md ${className}`}
    >
      <span className="mx-auto mt-1.5 block h-1.5 w-12 rounded-full bg-navy" />
      {children}
    </div>
  );
}

/** Step 1: the catalogue on a phone. */
export function BrowsePhone() {
  return (
    <PhoneFrame>
      <div className="flex items-center justify-between px-3 pb-2 pt-2">
        <span className="font-heading text-[12px] font-semibold italic text-primary">{siteConfig.name}</span>
        <Menu className="size-3 text-navy" strokeWidth={1.5} />
      </div>
      <div className="mx-2 rounded-lg bg-navy px-3 py-3 text-left">
        <p className="font-heading text-[12px] font-semibold leading-tight text-white">
          Accessories that make every look yours.
        </p>
        <span className="mt-2 inline-block rounded border border-white/70 px-2 py-0.5 text-[7px] text-white">
          Browse collection
        </span>
      </div>
      <p className="mt-3 text-center text-[9px] font-medium text-navy">Shop by Category</p>
      <div className="grid grid-cols-3 gap-x-1.5 gap-y-2 px-3 pb-4 pt-2">
        {miniCategories.map(({ label, icon }) => {
          const Icon = miniIcons[icon];
          return (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="grid size-8 place-items-center rounded-lg bg-primary-soft text-primary">
                <Icon className="size-4" strokeWidth={1.5} />
              </span>
              <span className="text-center text-[6.5px] leading-tight text-muted">{label}</span>
            </div>
          );
        })}
      </div>
    </PhoneFrame>
  );
}

/** Step 2: a product card with the order button. Placeholder product: no invented names or prices. */
export function ProductPreview() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[200px] text-left">
      <div className="grid aspect-[4/5] place-items-center rounded-xl border border-primary-border bg-background">
        <div className="flex flex-col items-center gap-2 text-muted">
          <Gem className="size-8 text-primary/60" strokeWidth={1.5} />
          <span className="text-xs">Photo coming soon</span>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-navy">Product name</p>
      <p className="text-sm font-bold text-primary">Ask for price</p>
      <span className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-[13px] font-medium text-white">
        Order on WhatsApp
      </span>
    </div>
  );
}

/** Step 3: the prefilled chat message, built from the same helper the real buttons use. */
export function ChatPhone() {
  return (
    <PhoneFrame>
      <div className="mt-1.5 flex items-center gap-2 bg-navy px-3 py-2 text-left">
        <span className="grid size-6 place-items-center rounded-full bg-primary-soft font-heading text-[11px] font-semibold text-primary">
          S
        </span>
        <span className="text-[10px] font-medium text-white">{siteConfig.name}</span>
      </div>
      <div className="min-h-[190px] bg-background px-2.5 py-4">
        <p className="ml-auto max-w-[135px] rounded-xl rounded-tr-sm border border-primary-border bg-primary-soft px-2.5 py-2 text-left text-[10px] leading-snug text-navy">
          {whatsappMessages.product("Product name")}
        </p>
      </div>
      <div className="flex items-center gap-1.5 border-t border-border bg-surface px-2 py-2">
        <span className="flex-1 rounded-full bg-background px-2.5 py-1.5 text-left text-[9px] text-muted">
          Type a message
        </span>
        <span className="grid size-6 place-items-center rounded-full bg-primary text-white">
          <Send className="size-3" strokeWidth={1.5} />
        </span>
      </div>
    </PhoneFrame>
  );
}

/** Step 4: confirmation illustration and checklist. */
export function ConfirmPanel() {
  return (
    <div className="w-full">
      <div
        aria-hidden="true"
        className="mx-auto grid size-28 place-items-center rounded-3xl bg-primary-soft text-primary"
      >
        <div className="flex flex-col items-center gap-2">
          <BadgeCheck className="size-9" strokeWidth={1.5} />
          <CreditCard className="size-9" strokeWidth={1.5} />
        </div>
      </div>
      <ul className="mt-6 space-y-3 text-left">
        {confirmChecklist.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-navy">
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-white"
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Step 5: a branded gift box, drawn in SVG so no photo is invented. */
export function GiftBox() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[220px] overflow-hidden rounded-xl border border-primary-border bg-background"
    >
      <Heart className="absolute left-4 top-4 size-7 text-primary" strokeWidth={1.5} />
      <svg viewBox="0 0 200 170" className="block w-full" focusable="false">
        <ellipse cx="100" cy="150" rx="78" ry="8" className="fill-navy" opacity="0.08" />
        <rect x="30" y="68" width="140" height="80" rx="6" className="fill-primary" />
        <rect x="24" y="52" width="152" height="26" rx="6" className="fill-primary-hover" />
        <rect x="30" y="74" width="140" height="4" className="fill-primary-active" opacity="0.6" />
        <text
          x="100"
          y="112"
          textAnchor="middle"
          fontSize="19"
          fontStyle="italic"
          fontWeight="600"
          fill="#fff"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Siya&apos;s
        </text>
        <text
          x="100"
          y="132"
          textAnchor="middle"
          fontSize="19"
          fontStyle="italic"
          fontWeight="600"
          fill="#fff"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Accessories
        </text>
      </svg>
    </div>
  );
}
