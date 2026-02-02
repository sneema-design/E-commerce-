import type { ProductFilter } from "@/types/product";

export function buildProductQuery(filters?: ProductFilter) {
  const params = new URLSearchParams();

  if (!filters) return params.toString();

  if (filters.title) params.append("title", filters.title);
  if (filters.categoryId)
    params.append("categoryId", String(filters.categoryId));
  if (filters.priceMin !== undefined)
    params.append("price_min", String(filters.priceMin));
  if (filters.priceMax !== undefined)
    params.append("price_max", String(filters.priceMax));

  // ✅ pagination (CORRECT)
  if (filters.limit !== undefined)
    params.append("limit", String(filters.limit));

  if (filters.offset !== undefined)
    params.append("offset", String(filters.offset));

  return params.toString();
}
