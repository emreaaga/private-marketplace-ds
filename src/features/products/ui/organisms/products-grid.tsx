"use client";

import type { Product } from "@/features/products/types/product.types";
import { ProductCard } from "@/features/products/ui/molecules/product-card";

interface ProductsGridProps {
  products: Product[];
  isMobile: boolean;
  onOpenMobileProduct: (product: Product) => void;
}

export function ProductsGrid({ products, isMobile, onOpenMobileProduct }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} isMobile={isMobile} onOpenMobile={onOpenMobileProduct} />
      ))}
    </div>
  );
}
