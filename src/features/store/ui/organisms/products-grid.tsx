"use client";

import dynamic from "next/dynamic";

import type { Product } from "@/features/seller/types/product.types";
import { useIsMobile } from "@/shared/hooks/use-mobile";

const ProductCardDesktop = dynamic(() => import("./product-card-desktop"), {
  ssr: false,
  loading: () => <div className="bg-muted/40 h-40 w-full rounded-xl" />,
});

const ProductCardMobile = dynamic(() => import("./product-card-mobile"), {
  ssr: false,
  loading: () => <div className="bg-muted/40 h-40 w-full rounded-xl" />,
});

interface ProductsGridProps {
  products: Product[];
  onOpenMobileProduct: (product: Product) => void;
}

export function ProductsGrid({ products, onOpenMobileProduct }: ProductsGridProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return (
      <div className="grid grid-cols-2 gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-muted/40 h-40 rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) =>
        isMobile ? (
          <ProductCardMobile key={product.id} product={product} onOpen={() => onOpenMobileProduct(product)} />
        ) : (
          <ProductCardDesktop key={product.id} product={product} />
        ),
      )}
    </div>
  );
}
