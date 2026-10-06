export type CategoryId =
  | "earrings"
  | "necklaces"
  | "bracelets"
  | "rings"
  | "hair-accessories"
  | "wrist-watch"
  | "perfumes"
  | "other";

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  /** Naira, integer. Undefined shows "Ask for price". */
  price?: number;
  /** Only set when a real discount exists. */
  compareAtPrice?: number;
  image: { src: string; alt: string };
  shortDescription?: string;
  /** Defaults to "in_stock" when omitted. */
  availability?: "in_stock" | "limited" | "out_of_stock";
  featured?: boolean;
}

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location?: string;
}

export interface SiteConfig {
  name: string;
  url: string;
  /** Digits only, international format, e.g. "2349061793607" */
  whatsappNumber: string;
  phoneDisplay: string;
  phoneTel: string;
  email: string;
  location: string;
  socials: {
    platform: "instagram" | "tiktok" | "facebook" | "x" | "pinterest";
    url: string;
  }[];
}