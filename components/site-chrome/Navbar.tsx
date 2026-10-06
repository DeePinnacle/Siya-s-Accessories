"use client";
import { useEffect, useState } from "react";
import { Mail, Menu, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/common/Logo";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { navLinks, siteConfig } from "@/data/site";
import { mailUrl, telUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const iconBtn =
  "grid size-11 place-items-center rounded-full text-primary transition-colors hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close the sheet first so its scroll lock is released, then scroll to the section
  const goTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 250);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background transition-shadow duration-300",
        scrolled ? "shadow-[0_1px_0_#E3E4EC,0_8px_24px_rgba(5,10,48,.06)]" : "shadow-none",
      )}
    >
      <div className="mx-auto flex h-[84px] max-w-[1280px] items-center justify-between px-5 lg:h-[96px] lg:px-8">
        <a href="#home" aria-label="Siya's Accessories, home" className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? "page" : undefined}
                  className={cn(
                    "inline-block border-b-2 py-1.5 text-[1.05rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                    active === l.href ? "border-primary text-primary" : "border-transparent text-navy hover:text-primary",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <WhatsAppButton placement="navbar" variant="soft" className="mr-1">WhatsApp Us</WhatsAppButton>
          <a href={telUrl()} aria-label={`Call ${siteConfig.phoneDisplay}`} className={iconBtn} onClick={() => trackEvent("call_click", { placement: "navbar" })}>
            <Phone aria-hidden className="size-6" strokeWidth={1.5} />
          </a>
          <a href={mailUrl()} aria-label={`Email ${siteConfig.name}`} className={iconBtn} onClick={() => trackEvent("email_click", { placement: "navbar" })}>
            <Mail aria-hidden className="size-6" strokeWidth={1.5} />
          </a>
        </div>

        {/* Mobile: own trigger button, shadcn Sheet handles focus trap, Escape and focus return */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className={cn(iconBtn, "md:hidden")}
        >
          <Menu aria-hidden className="size-7" strokeWidth={1.5} />
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent id="mobile-menu" side="right" className="w-[min(86vw,360px)] gap-0 bg-background p-6 md:hidden">
            <SheetHeader className="p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and contact options</SheetDescription>
              <Logo />
            </SheetHeader>

            <nav aria-label="Mobile" className="mt-6">
              <ul className="flex flex-col">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => goTo(e, l.href)}
                      aria-current={active === l.href ? "page" : undefined}
                      className={cn("block border-b border-border py-4 text-xl", active === l.href ? "text-primary" : "text-navy")}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <WhatsAppButton placement="mobile-menu" arrow>Order on WhatsApp</WhatsAppButton>
              <a href={telUrl()} onClick={() => trackEvent("call_click", { placement: "mobile-menu" })} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary text-primary">
                <Phone aria-hidden className="size-5" strokeWidth={1.5} /> Call {siteConfig.phoneDisplay}
              </a>
              <a href={mailUrl()} onClick={() => trackEvent("email_click", { placement: "mobile-menu" })} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary text-primary">
                <Mail aria-hidden className="size-5" strokeWidth={1.5} /> Email us
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}