import type { Product } from "@/features/products/types/product.types";

export type ProductSort = "none" | "price_asc" | "price_desc" | "qty_asc" | "qty_desc";

export type ProductFilterState = {
  search: string;
  category: string;
  sort: ProductSort;
};

export function filterProducts(products: Product[], state: ProductFilterState): Product[] {
  const { search, category, sort } = state;

  let data = [...products];

  if (search.trim()) {
    const q = search.toLowerCase();
    data = data.filter((p) => p.name.toLowerCase().includes(q));
  }

  if (category !== "all") {
    data = data.filter((p) => p.category === category);
  }

  switch (sort) {
    case "price_asc":
      data.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      data.sort((a, b) => b.price - a.price);
      break;
    case "qty_asc":
      data.sort((a, b) => a.quantity - b.quantity);
      break;
    case "qty_desc":
      data.sort((a, b) => b.quantity - a.quantity);
      break;
    case "none":
    default:
      break;
  }

  return data;
}
