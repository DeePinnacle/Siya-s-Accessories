import type { Metadata } from "next";

import {
  DM_Sans,
  Mrs_Saint_Delafield,
  Playfair_Display,
  Dancing_Script,
} from "next/font/google";

import { MotionConfig } from "motion/react";

import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-display",
});

const script = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-script",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),

  title: {
    default: "Siya's Accessories | Fashion Jewellery & Accessories in Lokoja",
    template: "%s | Siya's Accessories",
  },

  description:
    "Discover trendy and affordable fashion jewellery and accessories from Siya's Accessories in Lokoja, Kogi State. Shop earrings, necklaces, bracelets, rings, watches and hair accessories. Order conveniently through WhatsApp.",

  applicationName: "Siya's Accessories",

  generator: "Next.js",

  keywords: [
    "Siya's Accessories",
    "fashion accessories Lokoja",
    "jewellery Lokoja",
    "fashion jewellery Lokoja",
    "accessories in Lokoja",
    "earrings Lokoja",
    "necklaces Lokoja",
    "bracelets Lokoja",
    "rings Lokoja",
    "watches Lokoja",
    "hair accessories Lokoja",
    "women's accessories Nigeria",
    "fashion jewellery Nigeria",
    "affordable accessories Nigeria",
    "Kogi State accessories",
  ],

  authors: [
    {
      name: "Siya's Accessories",
    },
  ],

  creator: "Siya's Accessories",
  publisher: "Siya's Accessories",

  category: "Fashion & Accessories",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Siya's Accessories",
    title: "Siya's Accessories | Fashion Jewellery & Accessories in Lokoja",
    description:
      "Shop trendy and affordable earrings, necklaces, bracelets, rings, watches and hair accessories from Siya's Accessories in Lokoja, Kogi State. Order easily through WhatsApp.",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Siya's Accessories - Fashion Jewellery & Accessories",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Siya's Accessories | Fashion Jewellery & Accessories",
    description:
      "Trendy and affordable fashion jewellery and accessories in Lokoja, Kogi State. Browse our collection and order conveniently through WhatsApp.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.webmanifest",

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  other: {
    "geo.region": "NG-KO",
    "geo.placename": "Lokoja",
    "content-language": "en-NG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-NG"
      className={`${sans.variable} ${display.variable} ${script.variable} ${dancingScript.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>

        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}