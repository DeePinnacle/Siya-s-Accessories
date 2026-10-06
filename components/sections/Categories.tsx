"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Gem, Sparkles, Heart, Link2, Flower2 } from "lucide-react";
import { categories } from "@/data/categories";
import { selectCategory } from "@/lib/categoryevents";
import type { CategoryId } from "@/types/categories";

const icons: Record<CategoryId, typeof Gem> = {
  earrings: Sparkles,
  necklaces: Link2,
  bracelets: Heart,
  rings: Gem,
  "hair-accessories": Flower2,
  waistbeads: Flower2,
  glasses: Link2,
  perfumes: Sparkles,
  other: Gem,
};

export default function Categories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    dragFree: false, 
  });
  const [active, setActive] = useState<CategoryId | null>(null);

  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("select", onChange).on("reInit", onChange).on("resize", onChange);
      return () => {
        emblaApi.off("select", onChange).off("reInit", onChange).off("resize", onChange);
      };
    },
    [emblaApi]
  );

  const canPrev = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollPrev() ?? false,
    () => false
  );
  const canNext = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollNext() ?? false,
    () => false
  );

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="scroll-mt-20 bg-background py-16 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2
              id="categories-heading"
              className="font-heading uppercase text-[clamp(1.875rem,4vw+0.5rem,3rem)] font-medium leading-[1.1] text-navy"
            >
              Find your finishing touch
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-muted md:text-lg">
              From earrings to waist beads, find the piece that completes your look. Pick a category to browse.
            </p>
          </div>

          <div className="hidden shrink-0 gap-2 md:flex">
            <ArrowButton label="Previous categories" disabled={!canPrev} onClick={() => emblaApi?.scrollPrev()}>
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </ArrowButton>
            <ArrowButton label="Next categories" disabled={!canNext} onClick={() => emblaApi?.scrollNext()}>
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </ArrowButton>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[1200px] pl-5 md:mt-12 md:px-8">
        <div
          ref={emblaRef}
          className="overflow-hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="Shop by category"
        >
          <ul className="-ml-4 flex touch-pan-y md:-ml-5">
            {categories.map((c, i) => {
              const Icon = icons[c.id];
              const pressed = active === c.id;
              return (
                <li
                  key={c.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${categories.length}`}
                  className="min-w-0 shrink-0 grow-0 basis-[62%] pl-4 sm:basis-[40%] md:basis-[30%] md:pl-5 lg:basis-1/4"
                >
                  <button
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => {
                      setActive(c.id);
                      selectCategory(c.id);
                    }}
                    className="group block w-full select-none rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <div
                      className={`relative aspect-[4/5] overflow-hidden rounded-2xl border bg-surface shadow-[0_1px_2px_rgba(5,10,48,.06)] transition-shadow duration-300 md:group-hover:shadow-[0_8px_24px_rgba(5,10,48,.08)] ${
                        pressed ? "border-primary ring-1 ring-primary" : "border-border"
                      }`}
                    >
                      {c.image ? (
                        <Image
                          src={c.image.src}
                          alt={c.image.alt}
                          fill
                          draggable={false}
                          sizes="(min-width:1024px) 280px, (min-width:640px) 30vw, 62vw"
                          className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-primary-soft text-primary/70">
                          <Icon className="h-9 w-9" strokeWidth={1.5} aria-hidden />
                          <span className="text-xs">Photo coming soon</span>
                        </div>
                      )}
                    </div>
                    <div className="px-1 pt-4">
                      <h3 className="font-heading text-xl font-semibold text-navy md:text-2xl">{c.label}</h3>
                      <p className="mt-1 text-sm text-text-muted">{c.blurb}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary-border bg-surface text-primary transition-colors hover:bg-primary-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:border-border disabled:text-text-muted/50 disabled:hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {children}
    </button>
  );
}