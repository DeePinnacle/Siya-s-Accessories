import type { CategoryId } from "@/types/categories";

export interface CategoryTile {
  id: Exclude<CategoryId, "other">;
  label: string;
  /** Short line shown under the label. Keep factual, no product claims. */
  blurb: string;
  image?: { src: string; alt: string };
  placeholder?: boolean;
}

export const categories: CategoryTile[] = [
  { id: "earrings", label: "Earrings", blurb: "Studs, drops and hoops", placeholder: true, image: {src: "/siya-earrings.png", alt: ""} },
  { id: "necklaces", label: "Necklaces", blurb: "Layer them or wear one", placeholder: true, image: {src: "/necklace.png", alt: ""} },
  { id: "bracelets", label: "Bracelets", blurb: "For every wrist", placeholder: true, image: {src: "/bracelet.png", alt: ""} },
  { id: "rings", label: "Rings", blurb: "Stack, mix, repeat", placeholder: true, image: {src: "/rings.png", alt: ""} },
  { id: "hair-accessories", label: "Hair Accessories", blurb: "Finish the look", placeholder: true, image: {src: "/hair.png", alt: ""} },
  { id: "waistbeads", label: "Waist Beads", blurb: "Finish the look", placeholder: true, image: {src: "/waistbeads.png", alt: ""} },
  { id: "glasses", label: "Eye Glasses", blurb: "Blend the look", placeholder: true, image: {src: "/glasses.png", alt: ""} },
  { id: "perfumes", label: "Perfumes", blurb: "Discover your scent", placeholder: true, image: {src: "/perfumes.png", alt: ""} },
];