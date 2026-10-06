type Params = { placement: string; productId?: string };
declare global { interface Window { gtag?: (...args: unknown[]) => void } }

export function trackEvent(name: "whatsapp_click" | "call_click" | "email_click" | "social_click", params: Params) {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === "undefined") return; // no-op without GA
  window.gtag?.("event", name, params);
}