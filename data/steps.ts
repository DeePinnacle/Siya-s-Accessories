export type StepId = "browse" | "tap" | "chat" | "confirm" | "receive";

export interface OrderStep {
  id: StepId;
  title: string;
  description: string;
}

/**
 * Five steps taken from the approved mockup (AGENT.md §12.8 lists three; see final report).
 * Copy deliberately avoids delivery fees, areas, timelines or "secure/reliable" claims (AGENT.md O3, §28.1).
 */
export const orderSteps: OrderStep[] = [
  {
    id: "browse",
    title: "Browse Our Collection",
    description: "Explore our categories and find the accessories that match your style.",
  },
  {
    id: "tap",
    title: "Tap “Order on WhatsApp”",
    description: "Click the Order button on the piece you love.",
  },
  {
    id: "chat",
    title: "Chat with Us",
    description: "You'll be redirected to WhatsApp with a prefilled message about the product. Just send it.",
  },
  {
    id: "confirm",
    title: "Confirm & Pay",
    description: "We'll confirm your order, share payment details, and arrange delivery.",
  },
  {
    id: "receive",
    title: "Receive & Enjoy",
    description: "Your accessory is on its way to you, ready to make you look and feel amazing.",
  },
];

export const confirmChecklist = [
  "Payment details shared in the chat",
  "Order confirmation",
  "Delivery arranged with you",
];

export const orderAssurances: { icon: "chat" | "sparkles" | "heart" | "pin"; label: string }[] = [
  { icon: "chat", label: "Easy ordering on WhatsApp" },
  { icon: "sparkles", label: "Trendy styles" },
  { icon: "heart", label: "Affordable pieces" },
  { icon: "pin", label: "Lokoja, Kogi State, Nigeria" },
];

/** Category names shown on the mini phone screen in step 1. */
export const miniCategories: { label: string; icon: "sparkles" | "heart" | "circle" | "gem" | "flower" }[] = [
  { label: "Earrings", icon: "sparkles" },
  { label: "Necklaces", icon: "heart" },
  { label: "Bracelets", icon: "circle" },
  { label: "Rings", icon: "gem" },
  { label: "Hair Accessories", icon: "flower" },
];
