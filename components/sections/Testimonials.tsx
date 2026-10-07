"use client";

import { useCallback, useMemo, useSyncExternalStore, type KeyboardEvent } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { motion, useReducedMotion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Gem,
  Heart,
  MapPin,
  Quote,
  ShieldCheck,
  Star,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { testimonials, trustItems } from "@/data/testimonials";
import type { Testimonial, TrustItem } from "@/types/testimonials";

const trustIcons: Record<TrustItem["id"], LucideIcon> = {
  quality: Gem,
  trusted: ShieldCheck,
  ordering: Truck,
  style: Heart,
};

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function ArrowButton({
  direction,
  disabled,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={cn(
        "grid size-12 shrink-0 place-items-center rounded-full bg-white text-primary",
        "shadow-[0_8px_24px_rgba(5,10,48,0.12)] ring-1 ring-border transition-[background-color,opacity,transform] duration-200",
        "hover:bg-primary-soft active:scale-[0.97]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:active:scale-100",
        className,
      )}
    >
      <Icon className="size-6" strokeWidth={2} aria-hidden />
    </button>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`${rating} out of 5 stars`} className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn("size-[18px]", i < rating ? "fill-primary text-primary" : "fill-transparent text-primary-border")}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col rounded-[28px] bg-white p-6 shadow-[0_12px_40px_rgba(5,10,48,0.08)] ring-1 ring-border/70 sm:p-7">
      <div className="flex items-start justify-between">
        <Image
          src={item.avatar.src}
          alt={item.avatar.alt}
          width={90}
          height={90}
          sizes="90px"
          className="size-[76px] rounded-full object-cover sm:size-[90px]"
        />
        <Quote
          aria-hidden
          className="size-14 fill-primary-border text-primary-border sm:size-[60px]"
          strokeWidth={1}
        />
      </div>

      <div className="mt-5">
        <Stars rating={item.rating} />
      </div>

      <blockquote className="mt-4 text-[17px] leading-[1.65] text-navy text-pretty">
        <p>“{item.quote}”</p>
      </blockquote>

      <figcaption className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div className="min-w-0">
          <p className="font-serif text-xl font-semibold text-navy">{item.name}</p>
          {item.location && (
            <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-text-muted">
              <MapPin aria-hidden className="size-4 shrink-0 fill-primary text-white" strokeWidth={1.5} />
              <span className="truncate">{item.location}</span>
            </p>
          )}
        </div>
        {item.product && (
          <Image
            src={item.product.src}
            alt={item.product.alt}
            width={96}
            height={96}
            sizes="96px"
            className="size-20 shrink-0 rounded-2xl object-cover sm:size-24"
          />
        )}
      </figcaption>
    </figure>
  );
}

function ScriptTagline() {
  return (
    <div
      role="img"
      aria-label="Your style, our priority"
      className="relative -rotate-6 font-[family-name:var(--font-script)] leading-[0.95] text-primary"
    >
      <p className="text-[34px] xl:text-[48px]">Your Style</p>
      <p className="pl-5 text-[34px] xl:pl-8 xl:text-[48px]">Our Priority</p>
      <Heart aria-hidden className="absolute -right-9 bottom-5 size-7 text-primary" strokeWidth={1.75} />
      <svg aria-hidden viewBox="0 0 170 26" fill="none" className="ml-6 mt-1 w-36 xl:ml-10 xl:w-44">
        <path d="M3 22C45 9 105 8 167 2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function useEmblaButtons(api: EmblaCarouselType | undefined) {
  const subscribe = useCallback(
    (notify: () => void) => {
      if (!api) return () => {};
      api.on("select", notify).on("reInit", notify);
      return () => {
        api.off("select", notify).off("reInit", notify);
      };
    },
    [api],
  );
  const canPrev = useSyncExternalStore(subscribe, () => api?.canScrollPrev() ?? false, () => false);
  const canNext = useSyncExternalStore(subscribe, () => api?.canScrollNext() ?? false, () => false);
  return { canPrev, canNext };
}

export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return <TestimonialsSection />;
}

function TestimonialsSection() {
  const reduceMotion = useReducedMotion();
  const plugins = useMemo(
    () =>
      reduceMotion
        ? []
        : [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })],
    [reduceMotion],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps", 
      slidesToScroll: 1,
      duration: 28,
    },
    plugins,
  );
  const { canPrev, canNext } = useEmblaButtons(emblaApi);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(!!reduceMotion), [emblaApi, reduceMotion]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(!!reduceMotion), [emblaApi, reduceMotion]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  };

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="bg-background">
      {/* ---------- Upper area: portrait + header + carousel ---------- */}
      <div className="relative overflow-hidden">
        {/* Portrait. Mobile/tablet: soft vignette above the header. Desktop: left column fading to the right. */}
        <div
          aria-hidden={false}
          className={cn(
            "pointer-events-none absolute left-1/2 top-0 h-[320px] w-full max-w-[440px] -translate-x-1/2",
            "[mask-image:radial-gradient(ellipse_at_50%_35%,black_42%,transparent_72%)]",
            "lg:inset-y-0 lg:left-0 lg:h-full lg:w-[30%] lg:max-w-none lg:translate-x-0",
            "lg:[mask-image:linear-gradient(to_right,black_68%,transparent_100%)]",
          )}
        >
          <Image
            src="/elegant-lady.png"
            alt="Smiling woman wearing gold hoop earrings, a clover pendant necklace and layered gold bracelets"
            fill
            sizes="(min-width: 1024px) 30vw, 440px"
            className="object-cover object-[50%_12%] lg:object-[58%_top]"
          />
        </div>

        <div className="relative z-10 pb-14 pt-[270px] sm:pt-[290px] lg:pb-16 lg:pt-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="px-5 sm:px-8 lg:ml-[24.9%] lg:mr-[3.3%] lg:px-0 xl:mx-0 xl:px-8"
          >
            <div className="mx-auto max-w-[680px] text-center">
              <p className="text-[13px] font-bold uppercase tracking-[0.32em] text-primary sm:text-sm">
                What our customers say
              </p>
              <h2
                id="testimonials-heading"
                className="mt-5 font-serif text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.1] text-navy"
              >
                Real People, Real Style
              </h2>
              <p className="mx-auto mt-5 max-w-[34rem] text-base leading-relaxed text-navy/80 text-pretty sm:text-lg">
                Our customers love the quality, style and service they get at Siya’s Accessories. Here’s what a few
                of them have to say.
              </p>
              <span aria-hidden className="mx-auto mt-6 block h-0.5 w-[70px] rounded-full bg-primary" />
            </div>
          </motion.div>

          {/* Script sign-off: inline on small screens, top-right on xl */}
          <div className="mt-8 flex justify-center pr-8 xl:absolute xl:right-[3.5%] xl:top-[72px] xl:mt-0 xl:block xl:pr-0">
            <ScriptTagline />
          </div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer testimonials"
            className="relative mt-10 lg:mt-12"
          >
            <div className="px-5 sm:px-8 lg:ml-[24.9%] lg:mr-[3.3%] lg:px-0">
              <div
                ref={emblaRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                aria-label="Use the left and right arrow keys to browse testimonials"
                className="-my-10 overflow-hidden rounded-[28px] py-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <div className="-ml-4 flex [touch-action:pan-y_pinch-zoom] sm:-ml-6">
                  {testimonials.map((item, i) => (
                    <div
                      key={item.id}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${testimonials.length}`}
                      className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 sm:basis-1/2 sm:pl-6 xl:basis-1/3"
                    >
                      <TestimonialCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop arrows: sit at the section edges, as in the design */}
            <ArrowButton
              direction="prev"
              disabled={!canPrev}
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 lg:grid"
            />
            <ArrowButton
              direction="next"
              disabled={!canNext}
              onClick={scrollNext}
              className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 lg:grid"
            />

            {/* Mobile / tablet arrows: thumb-reachable row under the cards */}
            <div className="mt-8 flex justify-center gap-4 lg:hidden">
              <ArrowButton direction="prev" disabled={!canPrev} onClick={scrollPrev} />
              <ArrowButton direction="next" disabled={!canNext} onClick={scrollNext} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- Trust strip ---------- */}
      <div className="relative overflow-hidden bg-primary text-white">
        <svg
          aria-hidden
          viewBox="0 0 260 120"
          fill="none"
          className="pointer-events-none absolute -bottom-2 right-0 hidden w-60 opacity-20 lg:block"
        >
          <path d="M0 118C60 112 90 60 140 52c40-6 70 18 120-30" stroke="white" strokeWidth="1.5" />
          <path d="M20 120C70 108 110 70 150 66c36-4 66 12 110-18" stroke="white" strokeWidth="1" />
        </svg>

        <ul className="relative mx-auto grid max-w-[1536px] grid-cols-2 lg:grid-cols-4">
          {trustItems.map((t) => {
            const Icon = trustIcons[t.id];
            return (
              <li
                key={t.id}
                className={cn(
                  "relative flex flex-col items-center px-4 py-8 text-center lg:py-10",
                  // mobile 2×2 dividers
                  "max-lg:border-white/20 max-lg:odd:border-r max-lg:[&:nth-child(-n+2)]:border-b",
                  // desktop inset vertical dividers
                  "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-14 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-white/25 lg:last:after:hidden",
                )}
              >
                <Icon aria-hidden className="size-9 sm:size-10" strokeWidth={1.25} />
                <p className="mt-3 font-serif text-lg font-semibold sm:text-[22px]">{t.title}</p>
                <p className="mt-1 text-[13px] text-white/90 sm:text-sm">{t.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}