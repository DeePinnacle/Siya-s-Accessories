import { ArrowDown, ArrowRight, Heart, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { orderAssurances, orderSteps, type StepId } from "@/data/steps";
import { siteConfig } from "@/data/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { BrowsePhone, ChatPhone, ConfirmPanel, GiftBox, ProductPreview } from "./Visuals";
import { WhyChooseBanner } from "./WhyChooseBanner";

const visuals: Record<StepId, React.ReactNode> = {
  browse: <BrowsePhone />,
  tap: <ProductPreview />,
  chat: <ChatPhone />,
  confirm: <ConfirmPanel />,
  receive: <GiftBox />,
};

const assuranceIcons = {
  chat: MessageCircle,
  sparkles: Sparkles,
  heart: Heart,
  pin: MapPin,
} as const;

export function HowToOrder() {
  const lastIndex = orderSteps.length - 1;

  return (
    <section
      id="how-to-order"
      aria-labelledby="how-to-order-heading"
      className="scroll-mt-20 bg-background py-16 md:py-24 lg:py-28"
    >
      <Container>
        {/* Heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-20" />
            How to order
            <span aria-hidden="true" className="h-px w-10 bg-primary sm:w-20" />
          </p>
          <h2
            id="how-to-order-heading"
            className="mt-4 font-serif text-[clamp(1.9rem,5vw,3rem)] font-semibold leading-[1.1] text-navy"
          >
            Getting your fave accessories
            <span className="mt-1 block font-script text-[1.15em] text-primary">is easy!</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-navy leading-relaxed md:text-lg">
            A few simple steps to place your order via WhatsApp. Follow the guide below.
          </p>
        </Reveal>

        {/* Steps */}
        <ol className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-14 md:mt-16 md:gap-y-8">
          {orderSteps.map((step, index) => (
            <li
              key={step.id}
              className="relative w-full max-w-md md:max-w-none md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-19.2px)]"
            >
              <Reveal delay={index * 0.08} className="h-full">
                <div className="relative h-full pt-6">
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-0 z-10 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-primary font-heading text-xl font-semibold text-white shadow-sm"
                  >
                    {index + 1}
                  </span>
                  <article className="flex h-full flex-col rounded-2xl border border-primary-border/70 bg-surface px-5 pb-6 pt-9 text-center shadow-sm">
                    <h3 className="font-heading text-[1.4rem] font-semibold leading-tight text-navy xl:min-h-[3.1rem]">
                      <span className="sr-only">Step {index + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy">{step.description}</p>
                    <div className="mt-auto flex w-full justify-center pt-7">{visuals[step.id]}</div>
                  </article>
                </div>
              </Reveal>

              {index < lastIndex && (
                <>
                  {/* Single-column stack: arrow points down between cards */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-full z-10 mt-1.5 grid size-9 -translate-x-1/2 place-items-center rounded-full bg-primary-soft text-primary md:hidden"
                  >
                    <ArrowDown className="size-4" strokeWidth={1.75} />
                  </span>
                  {/* Five-up row: arrow points right across the gap */}
                  <span
                    aria-hidden="true"
                    className="absolute left-full top-[55%] z-10 ml-3 hidden size-9 -translate-x-1/2 place-items-center rounded-full bg-primary-soft text-primary xl:grid"
                  >
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </span>
                </>
              )}
            </li>
          ))}
        </ol>

        {/* WhatsApp banner */}
        <Reveal className="mt-14 md:mt-16">
          <WhyChooseBanner />
        </Reveal>

        {/* Assurance strip */}
        <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-primary-border">
          {orderAssurances.map(({ icon, label }) => {
            const Icon = assuranceIcons[icon];
            return (
              <li key={label} className="flex items-center justify-center gap-3 px-2 text-sm text-primary md:px-4">
                <Icon aria-hidden="true" className="size-6 shrink-0 text-primary" strokeWidth={1.5} />
                <span className="text-left">{label}</span>
              </li>
            );
          })}
        </ul>

        <div aria-hidden="true" className="mt-10 flex items-center justify-center gap-4 text-primary">
          <span className="h-px w-16 bg-primary/70 md:w-24" />
          <Heart className="size-5" strokeWidth={1.5} />
          <span className="h-px w-16 bg-primary/70 md:w-24" />
        </div>
      </Container>
    </section>
  );
}
