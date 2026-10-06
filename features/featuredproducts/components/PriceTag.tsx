import { cn } from "@/lib/cn";
import { formatNaira } from "@/lib/format";

interface PriceTagProps {
  price?: number;
  compareAtPrice?: number;
  className?: string;
}

export function PriceTag({ price, compareAtPrice, className }: PriceTagProps) {
  if (price === undefined) {
    return (
      <p className={cn("text-base text-text-muted", className)}>Ask for price</p>
    );
  }

  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline justify-center gap-x-2 text-lg font-medium text-navy",
        className,
      )}
    >
      <span>{formatNaira(price)}</span>
      {compareAtPrice !== undefined && (
        <s className="text-sm font-normal text-text-muted">
          <span className="sr-only">Was </span>
          {formatNaira(compareAtPrice)}
        </s>
      )}
    </p>
  );
}