"use client";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { siteConfig } from "@/data/site";

export function Hero() {
  const reduce = useReducedMotion();
  const container = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.1 } } };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.01 : 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col justify-center pb-6 pt-10 lg:min-h-[720px] lg:max-w-[46%] lg:py-20"
        >
          <motion.p variants={item} className="text-[0.8rem] font-medium tracking-[0.28em] text-primary sm:text-sm">
            TRENDY <span aria-hidden className="mx-1.5">•</span> ELEGANT <span aria-hidden className="mx-1.5">•</span> AFFORDABLE
          </motion.p>

          <motion.h1 variants={item} id="hero-title" className="mt-6 font-serif font-bold leading-[1.05] text-navy">
            <span className="block text-[clamp(2.75rem,7.2vw,5.2rem)]">Style That</span>
            <span className="-mt-1 block font-script text-[clamp(3.6rem,9.6vw,7rem)] font-normal leading-[1] text-primary">
              Completes You
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-[30rem] text-base leading-[1.7] text-navy sm:text-lg">
            Discover beautiful accessories that add the perfect touch to your look. From jewellery to hair accessories and
            more — {siteConfig.name} has everything you need to express your style.
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <WhatsAppButton placement="hero" arrow className="w-full sm:w-auto">Order on WhatsApp</WhatsAppButton>
          </motion.div>

          <motion.p variants={item} className="mt-6 flex items-center gap-2.5 text-[0.95rem] text-primary">
            <MapPin aria-hidden className="size-5 fill-primary" strokeWidth={1.5} />
            <span>{siteConfig.location}</span>
          </motion.p>
        </motion.div>
      </div>

      <div className="hero-photo relative aspect-[4/5] w-full sm:aspect-[3/2] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[64%]">
        <Image
          src="/heroImage.png"
          alt="Woman wearing gold hoop earrings, a clover pendant necklace, a ring and stacked bracelets"
          fill
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover object-[58%_30%]"
        />
        <div aria-hidden className="absolute right-[6%] top-[22%] hidden -rotate-[10deg] text-primary lg:block">
          <p className="font-script text-[2.1rem] leading-[1.05]">
            Accessories<br />for every<br />occasion
            <Heart className="ml-2 inline size-7 translate-y-1 rotate-12" strokeWidth={1.5} />
          </p>
          <span className="mt-2 block h-1.5 w-32 -rotate-[8deg] rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
}