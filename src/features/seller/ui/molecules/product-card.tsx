"use client";

import type { Product } from "@/features/products/types/product.types";
import { useIsMobile } from "@/shared/hooks/use-mobile";

import { ProductCardDesktop } from "./product-card-desktop";
import { ProductCardMobile } from "./product-card-mobile";

interface ProductCardProps {
  product: Product;
  onOpenMobile?: (product: Product) => void;
}

export function ProductCard({ product, onOpenMobile }: ProductCardProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ProductCardMobile product={product} onOpen={() => onOpenMobile?.(product)} />;
  }

  return <ProductCardDesktop product={product} />;
}
