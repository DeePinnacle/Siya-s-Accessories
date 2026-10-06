// TODO: replace with SVG/PNG logo file (O6). Text-built stand-in matching the mockup.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex flex-col items-start text-navy ${className}`} aria-label="Siya's Accessories" role="img">
      <svg aria-hidden viewBox="0 0 32 22" className="absolute left-[2.6rem] top-0 h-4 w-6" fill="currentColor">
        <path d="M2 20 0 6l8 6 8-10 8 10 8-6-2 14H2Zm1 2h26v-1.5H3V22Z" />
      </svg>
      <span aria-hidden className="pt-2 font-script text-[2.9rem] leading-[0.85]">Siya&apos;s</span>
      <span aria-hidden className="-mt-0.5 text-[0.62rem] font-medium tracking-[0.55em]">ACCESSORIES</span>
    </span>
  );
}


