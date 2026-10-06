import type { Product } from "@/types/featured-products";

/**
 * TODO(client, AGENT.md O8): the names, taglines and prices below were taken from
 * the design mockup, not from confirmed client data. Confirm or edit before launch.
 * Set `price` to undefined to show "Ask for price" instead.
 *
 * TODO(photos): the images are low-res crops from the mockup. Replace each
 * `image.src` with a real, optimised product photo (4:5, <= ~200KB).
 */
export const products: Product[] = [
  {
    id: "featured-earrings",
    name: "Earrings",
    category: "earrings",
    price: 12000,
    image: {
      src: "/gold-earrings.png",
      alt: "Pair of gold-coloured teardrop earrings set with clear stones, beside a Siya's Accessories gift box",
    },
    shortDescription: "Add a touch of sparkle to your look.",
    featured: true,
  },
  {
    id: "featured-necklaces",
    name: "Necklaces",
    category: "necklaces",
    price: 15000,
    image: {
      src: "/gold-necklace.png",
      alt: "Gold-coloured butterfly pendant necklace in an open Siya's Accessories box",
    },
    shortDescription: "Classic pieces for every occasion.",
    featured: true,
  },
  {
    id: "featured-bracelets",
    name: "Bracelets",
    category: "bracelets",
    price: 10000,
    image: {
      src: "/black-bracelets.png",
      alt: "Gold-coloured bangle bracelet with a heart detail and clear stones",
    },
    shortDescription: "Simple. Elegant. Timeless.",
    featured: true,
  },
  {
    id: "featured-rings",
    name: "Rings",
    category: "rings",
    price: 8000,
    image: {
      src: "/black-rings.png",
      alt: "Gold-coloured ring with a large clear stone",
    },
    shortDescription: "Make a statement with every move.",
    featured: true,
  },
  {
    id: "featured-hair-accessories",
    name: "Hair Accessories",
    category: "hair-accessories",
    price: 7000,
    image: {
      src: "/hair-accessories.png",
      alt: "Black satin hair bow decorated with small pearl-like beads",
    },
    shortDescription: "Perfect for chic and effortless styles.",
    featured: true,
  }, 
  {
    id: "wrist-watch",
    name: "Wrist Watch",
    category: "wrist-watch",
    price: 25000,
    image: {
      src: "/wrist-watch.png",
      alt: "Black satin hair bow decorated with small pearl-like beads",
    },
    shortDescription: "Compliment the outfit.",
    featured: true,
  },
];

export const featuredProducts = products.filter((product) => product.featured);