"use client";

import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { siteConfig } from "@/data/site";
import { whyChooseContent } from "@/data/why-choose";
import { buildWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

export function WhyChooseBanner() {
  const href = buildWhatsAppUrl(generalEnquiryMessage());
  const number = siteConfig.phoneDisplay.replace(/\s/g, "");

  return (
    <div className="relative mt-4 overflow-hidden rounded-[20px] bg-linear-to-r from-[#1A258F] via-primary to-[#3B72E0] px-6 py-7 text-white sm:mt-5 lg:px-12">
      {/* decorative soft highlight, mockup right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 size-80 rounded-full bg-white/10 blur-2xl"
      />
      <div className="relative flex flex-col items-start gap-5 lg:grid lg:grid-cols-[auto_minmax(0,28rem)_auto] lg:items-center lg:justify-start lg:gap-x-6">
        <WhatsAppIcon aria-hidden className="size-12 shrink-0 text-white lg:size-16" />
        <div>
          <p className="text-sm text-white/85 lg:text-base">{whyChooseContent.bannerLead}</p>
          <p className="mt-1 text-xl font-medium leading-tight sm:text-2xl lg:text-[1.75rem]">
            {whyChooseContent.bannerTitle}
          </p>
        </div>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { placement: "why_choose_banner" })}
          aria-label={`Chat with ${siteConfig.name} on WhatsApp, ${number} (opens in a new tab)`}
          className="inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-7 text-base font-bold text-primary transition-transform hover:bg-primary-soft active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:ml-12 lg:min-h-14 lg:text-lg"
        >
          {number}
          <ArrowRight aria-hidden className="size-5" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}