const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** formatNaira(12000) -> "₦12,000" */
export function formatNaira(amount: number): string {
  return nairaFormatter.format(amount);
}