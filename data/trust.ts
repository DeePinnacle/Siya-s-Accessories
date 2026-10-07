// Content for the banner directly under "Shop by Category".
// Copy is taken from the approved mockup (Siya_s_Accessories__Style_That_Completes_You.png).
// TODO(client): confirm wording. "Quality you can love" is a soft claim, see final report.

export type TrustIcon = "gem" | "shield" | "truck" | "heart";

export interface TrustItem {
  id: string;
  icon: TrustIcon;
  title: string;
  subtitle: string;
  /** When set, the item renders as a WhatsApp link with this prefilled message. */
  whatsappMessage?: string;
}

export const trustItems: TrustItem[] = [
  {
    id: "trendy-styles",
    icon: "gem",
    title: "Trendy Styles",
    subtitle: "Latest looks, always",
  },
  {
    id: "affordable-luxury",
    icon: "shield",
    title: "Affordable Luxury",
    subtitle: "Quality you can love",
  },
  {
    // O3: delivery terms are unconfirmed. We only invite a WhatsApp question,
    // and never state fees, areas or timelines.
    id: "delivery",
    icon: "truck",
    title: "Ask Us on WhatsApp",
    subtitle: "About Delivery",
    whatsappMessage:
      "Hello Siya's Accessories, I'd like to ask about delivery options.",
  },
  {
    id: "priority",
    icon: "heart",
    title: "Your Style, Our Priority",
    subtitle: "Always",
  },
];