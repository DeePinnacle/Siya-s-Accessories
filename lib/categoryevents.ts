import type { CategoryId } from "@/types";

export const CATEGORY_SELECT_EVENT = "siya:select-category";

/** Called by Categories. FeaturedProducts listens and sets its active tab. */
export function selectCategory(id: CategoryId) {
  window.dispatchEvent(new CustomEvent<CategoryId>(CATEGORY_SELECT_EVENT, { detail: id }));
  document.getElementById("shop")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
}