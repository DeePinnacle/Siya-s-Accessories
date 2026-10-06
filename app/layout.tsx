import type { Metadata } from "next";
import { DM_Sans, Mrs_Saint_Delafield, Playfair_Display, Dancing_Script } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap", variable: "--font-dm-sans" });
const display = Playfair_Display({ subsets: ["latin"], weight: ["700"], display: "swap", variable: "--font-display" });
const script = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-script" });
const dancingScript = Dancing_Script({ subsets: ["latin"], weight: "700", display: "swap", variable: "--font-dancing-script" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Siya's Accessories | Trendy Fashion Jewellery & Accessories in Lokoja",
  description:
    "Shop trendy, affordable earrings, necklaces, bracelets, rings and hair accessories from Siya's Accessories in Lokoja, Kogi State. Order easily on WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${sans.variable} ${display.variable} ${script.variable} ${dancingScript.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-white">
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}