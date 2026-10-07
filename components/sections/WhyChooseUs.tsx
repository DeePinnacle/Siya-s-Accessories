import Image from "next/image";
import { Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/data/site";
import { whyChooseContent, whyChooseItems } from "@/data/why-choose";
import { WhyChooseBanner } from "./WhyChooseBanner";

export function WhyChoose() {
  const { image, intro, eyebrow } = whyChooseContent;

  return (
    <section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      className="scroll-mt-20 bg-background py-16 lg:py-24"
    >
      <Container>
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.22em] text-primary sm:gap-4 sm:text-base">
              <span aria-hidden className="h-px w-10 bg-primary sm:w-20" />
              {eyebrow}
              <span aria-hidden className="h-px w-10 bg-primary sm:w-20" />
            </p>
            <h2
              id="why-choose-heading"
              className="mt-3 font-serif text-[clamp(2rem,4.5vw+0.5rem,3.5rem)] font-semibold leading-[1.1] text-navy"
            >
              {siteConfig.name}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-muted lg:text-lg">
              {intro[0]}
              <br className="hidden sm:block" /> {intro[1]}
            </p>
          </header>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-[1fr_1fr_1fr_1.45fr] lg:grid-rows-2">
          {whyChooseItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.id} delay={(i % 3) * 0.08} className="h-full">
                <article className="flex h-full flex-col items-center rounded-[20px] border border-primary-border/60 bg-white/60 px-4 pb-7 pt-6 text-center lg:min-h-[20.5rem] lg:px-6 lg:pb-9 lg:pt-8">
                  <div className="grid size-16 place-items-center rounded-full bg-primary-soft lg:size-[5.5rem]">
                    <Icon aria-hidden className="size-8 text-primary lg:size-12" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-navy lg:mt-6 lg:text-[1.375rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-text-muted lg:mt-3 lg:text-base lg:leading-[1.7]">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}

          <Reveal delay={0.16} className="col-span-2 lg:col-span-1 lg:col-start-4 lg:row-span-2 lg:row-start-1">
            <figure className="relative aspect-[4/5] h-full w-full overflow-hidden rounded-[20px] lg:aspect-auto">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover object-[35%_70%] lg:object-center"
              />
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <WhyChooseBanner />
        </Reveal>

        <div aria-hidden className="mt-10 flex items-center justify-center gap-4">
          <span className="h-px w-20 bg-primary lg:w-24" />
          <Heart className="size-5 text-primary" strokeWidth={1.5} />
          <span className="h-px w-20 bg-primary lg:w-24" />
        </div>
      </Container>
    </section>
  );
}