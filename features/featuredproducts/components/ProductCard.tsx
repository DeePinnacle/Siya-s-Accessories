import Image from "next/image";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { PriceTag } from "@/features/featuredproducts/components/PriceTag";
import { productMessage } from "@/lib/feature-products-message";
import type { Product } from "@/types/featured-products";

// Card width: ~50vw on mobile, ~33vw on tablet, ~224px on desktop (5-up).
const IMAGE_SIZES = "(min-width: 1280px) 224px, (min-width: 640px) 33vw, 50vw";

// Hover effects only on devices that can hover, and only when motion is allowed.
const LIFT =
  "motion-safe:[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_8px_24px_rgba(5,10,48,0.08)]";
const ZOOM =
  "motion-safe:[@media(hover:hover)]:group-hover:scale-105";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.availability === "out_of_stock";
  const limited = product.availability === "limited";

  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-border bg-surface p-2 shadow-[0_1px_2px_rgba(5,10,48,0.06)] transition-[transform,box-shadow] duration-500 ease-out ${LIFT}`}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-primary-soft">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={IMAGE_SIZES}
          className={`object-cover transition-transform duration-700 ease-out ${ZOOM}`}
        />
        {(soldOut || limited) && (
          <span
            className={`absolute left-2 top-2 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-medium ${
              limited ? "text-warning" : "text-navy"
            }`}
          >
            {limited ? "Few left" : "Sold out"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4 text-center">
        <h3 className="font-heading text-xl font-medium leading-tight text-navy sm:text-[22px]">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="mt-1.5 text-balance text-sm leading-5 text-text-muted">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto pt-4">
          <PriceTag
            price={product.price}
            compareAtPrice={product.compareAtPrice}
          />
          <WhatsAppButton
            placement="product"
            productId={product.id}
            message={productMessage(product)}
            className="mt-3 h-auto min-h-[48px] w-full px-3 py-2 text-[13px] leading-tight sm:text-sm"
          >
            {soldOut ? "Ask about restock" : "Order on WhatsApp"}
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}