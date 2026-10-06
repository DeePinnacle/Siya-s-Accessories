"use client";

import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { ProductCard } from "@/features/featuredproducts/components/ProductCard";
import { featuredProducts } from "@/data/products";
import Link from "next/link";


const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = (gap: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
});

const drawLine = (delay: number): Variants => ({
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: EASE, delay } },
});

interface FeaturedProductsProps {
  exploreHref?: string;
}

export function FeaturedProducts({
  exploreHref = "#categories",
}: FeaturedProductsProps) {
  return (
    <section
      id="shop"
      aria-labelledby="featured-heading"
      className="relative scroll-mt-20 overflow-hidden bg-background py-16 md:py-24"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 256 256"
        fill="none"
        className="pointer-events-none absolute -left-4 -top-4 hidden h-64 w-64 text-primary-border md:block"
      >
        <path d="M0 200C70 170 150 90 180 0" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 256 256"
        fill="none"
        className="pointer-events-none absolute -bottom-4 -right-4 hidden h-64 w-64 rotate-180 text-primary-border md:block"
      >
        <path d="M0 200C70 170 150 90 180 0" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Header */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4"
          >
            <motion.span
              variants={drawLine(0.25)}
              aria-hidden="true"
              className="h-px w-8 origin-right bg-primary-border sm:w-14"
            />
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary sm:text-sm">
              Featured Products
            </p>
            <motion.span
              variants={drawLine(0.25)}
              aria-hidden="true"
              className="h-px w-8 origin-left bg-primary-border sm:w-14"
            />
          </motion.div>

          <motion.h2
            id="featured-heading"
            variants={fadeUp}
            className="mt-4 font-heading text-[clamp(30px,5vw,48px)] font-medium leading-[1.15] text-navy"
          >
            Style in Every Detail
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-pretty text-base text-text-muted sm:text-lg"
          >
            Discover our handpicked collection of trendy and elegant
            accessories, designed to elevate your everyday look.
          </motion.p>
        </motion.div>
        <motion.ul
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
          className="mt-10 flex flex-col justify-center gap-4 md:mt-14 lg:grid lg:grid-cols-3"
        >
          {featuredProducts.map((product) => (
            <motion.li
              key={product.id}
              variants={fadeUp}
              className="basis-[calc(50%-8px)] sm:basis-[calc(33.333%-10.67px)] xl:basis-[calc(20%-12.8px)]"
            >
              <ProductCard product={product} />
            </motion.li>
          ))}
        </motion.ul>

        {/* Footer link */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
          className="mt-10 text-center md:mt-12"
        >
          <Link
            href={exploreHref}
            className="group inline-flex min-h-[44px] items-center gap-3 rounded-md text-xs font-medium uppercase tracking-[0.2em] text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm"
          >
            Explore all products
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="h-5 w-5 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}