"use client";

import type { Product } from "@/features/products/types/product.types";
import { ProductCard } from "@/features/products/ui/molecules/product-card";

interface ProductsGridProps {
  products: Product[];
  onOpenMobileProduct: (product: Product) => void;
}

export function ProductsGrid({ products, onOpenMobileProduct }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onOpenMobile={onOpenMobileProduct} />
      ))}
    </div>
  );
}
