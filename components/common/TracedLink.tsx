"use client";

import type { ReactNode } from "react";

import { trackEvent } from "@/lib/analytics";
import Link from "next/link"

type TrackedEvent = "whatsapp_click" | "call_click" | "email_click" | "social_click";

interface TrackedLinkProps {
  href: string;
  event: TrackedEvent;
  placement: string;
  className?: string;
  children: ReactNode;
  /** Set for links that open a new tab (WhatsApp, socials). */
  external?: boolean;
}

/** An anchor that reports a click to trackEvent (AGENT.md section 24). */
export function TrackedLink({
  href,
  event,
  placement,
  className,
  children,
  external = false,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(event, { placement })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </Link>
  );
}