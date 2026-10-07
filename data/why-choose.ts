import { BadgeCheck, Gem, Headset, Heart, Tag, Truck, type LucideIcon } from "lucide-react";

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Claim not in the original brief. Client must confirm before launch (AGENT.md §28.1). */
  needsClientApproval?: boolean;
}

export const whyChooseContent = {
  eyebrow: "Why Choose",
  intro: ["We’re more than just accessories — we’re your style partner.", "Here’s why so many amazing customers choose us:"],
  bannerLead: "Have questions or ready to order?",
  bannerTitle: "Chat with us on WhatsApp",
  image: {
    src: "/why-choose.webp",
    alt: "Gold clover necklace, earrings and bangle in a navy gift box beside a navy bag and scrunchie",
    width: 768,
    height: 1358,
  },
} as const;

export const whyChooseItems: WhyChooseItem[] = [
  {
    id: "trendy",
    title: "Trendy & Stylish",
    description: "We bring you the latest styles and timeless pieces that keep you looking amazing, always.",
    icon: Gem,
  },
  {
    id: "quality",
    title: "Quality You Can Trust",
    description: "We carefully select our products to ensure you get the best quality and long-lasting value.",
    icon: BadgeCheck,
    needsClientApproval: true,
  },
  {
    id: "affordable",
    title: "Affordable Luxury",
    description: "Beautiful accessories that fit your style and your budget.",
    icon: Tag,
  },
  {
    id: "easy-ordering",
    title: "Easy Ordering",
    description: "Just tap “Order on WhatsApp” and we’ll handle the rest. Simple, quick and convenient.",
    icon: Truck,
  },
  {
    id: "support",
    title: "Friendly Support",
    description: "Have a question? We’re always here to help you.",
    icon: Headset,
    needsClientApproval: true,
  },
  {
    id: "more",
    title: "More Than Accessories",
    description: "We help you express your personality, boost your confidence and feel your best.",
    icon: Heart,
  },
];