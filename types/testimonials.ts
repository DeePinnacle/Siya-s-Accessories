// Merge into src/types/index.ts (replaces the old Testimonial type from AGENT.md §23).
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar: { src: string; alt: string };
  /** Product the customer bought, shown bottom-right of the card. */
  product?: { src: string; alt: string };
}

export interface TrustItem {
  id: "quality" | "trusted" | "ordering" | "style";
  title: string;
  description: string;
}