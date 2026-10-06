import { siteConfig } from "@/data/site";
import type { Product } from "@/types/featured-products";

/**
 * Prefilled WhatsApp text for a product (AGENT.md §14).
 * If you already keep message builders in lib/whatsapp.ts, move this there.
 */
export function productMessage(product: Product): string {
  if (product.availability === "out_of_stock") {
    return `Hello ${siteConfig.name}, I'd like to ask about the ${product.name}. When will it be available?`;
  }
  return `Hello ${siteConfig.name}, I'm interested in ordering the ${product.name}.`;
}