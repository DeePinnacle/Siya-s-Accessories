import Image from "next/image";
import { Gem, Mail, MapPin, Phone } from "lucide-react";

import { TrackedLink } from "@/components/common/TracedLink";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { Reveal } from "@/components/ui/reveal";
import { about } from "@/data/about";
import { siteConfig } from "@/data/site";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { buildWhatsAppUrl, mailUrl, telUrl } from "@/lib/whatsapp";

// "+2349061793607" -> "+234 906 179 3607"
const phoneInternational = siteConfig.phoneTel.replace(
  /^(\+234)(\d{3})(\d{3})(\d{4})$/,
  "$1 $2 $3 $4",
);

const rowLink =
  "underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] rounded-sm";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 py-16 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Image card. On mobile it stacks above the text. */}
        <Reveal>
          <figure className="mx-auto w-full max-w-[520px] pb-14 lg:mx-0">
            <div className="relative aspect-[4/3] -rotate-2 overflow-hidden rounded-2xl bg-[var(--color-accent-soft)] shadow-[0_8px_24px_rgba(5,10,48,0.08)]">
              {about.image.src ? (
                <Image
                  src={about.image.src}
                  alt={about.image.alt}
                  fill
                  sizes="(min-width: 1024px) 520px, (min-width: 640px) 520px, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[var(--color-accent)]">
                  <Gem aria-hidden className="size-8" strokeWidth={1.5} />
                  <span className="text-sm text-[var(--color-ink-muted)]">
                    Photo coming soon
                  </span>
                </div>
              )}
            </div>
            <figcaption className="mt-5 -rotate-3 pl-6 font-[family-name:var(--font-script,cursive)] text-2xl leading-tight text-primary sm:text-3xl">
              {about.caption}
              <span
                aria-hidden
                className="mt-2 block h-[3px] w-40 rounded-full bg-[var(--color-accent)]/35"
              />
            </figcaption>
          </figure>
        </Reveal>

        {/* Text */}
        <Reveal>
          <div className="max-w-[560px]">
            <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-primary">
              {about.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="mt-3 font-serif text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.15] text-navy"
            >
              {about.heading}
            </h2>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-navy lg:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-8 space-y-4 text-[15px] text-navy">
              <li className="flex items-start gap-3">
                <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.5} />
                <TrackedLink
                  href={mailUrl()}
                  event="email_click"
                  placement="about"
                  className={`break-all ${rowLink}`}
                >
                  {siteConfig.email}
                </TrackedLink>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIcon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <TrackedLink
                    href={telUrl()}
                    event="call_click"
                    placement="about"
                    className={rowLink}
                  >
                    <span className="sr-only">Call </span>
                    {siteConfig.phoneDisplay}
                  </TrackedLink>{" "}
                  <span className="text-[var(--color-ink-muted)]">(WhatsApp / Phone)</span>
                  <div className="text-[var(--color-ink-muted)]">
                    {phoneInternational} (International)
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.5} />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
            <div className='my-4'>
                <WhatsAppButton placement="hero" arrow className="w-full sm:w-auto">Order on WhatsApp</WhatsAppButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}