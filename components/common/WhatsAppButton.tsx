"use client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { buildWhatsAppUrl, messages } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

type Props = {
  placement: string;
  variant?: "solid" | "soft";
  arrow?: boolean;
  message?: string;
  productId?: string;
  className?: string;
  children: React.ReactNode;
};

export function WhatsAppButton({ placement, variant = "solid", arrow, message = messages.general, productId, className, children }: Props) {
  return (
    <MotionLink
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.98 }}
      onClick={() => trackEvent("whatsapp_click", { placement, productId })}
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-full font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variant === "solid"
          ? "min-h-14 bg-primary px-8 text-lg text-white hover:bg-primary-hover active:bg-primary-active"
          : "min-h-11 bg-primary-soft px-5 text-[0.95rem] text-primary hover:bg-primary-border",
        className,
      )}
    >
      <WhatsAppIcon className={variant === "solid" ? "size-7" : "size-6"} />
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden className="size-5" strokeWidth={1.5} />}
      <span className="sr-only">(opens in a new tab)</span>
    </MotionLink>
  );
}