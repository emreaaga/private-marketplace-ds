"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { fakeProducts } from "@/features/seller/fake-products";
import type { Product } from "@/features/seller/types/product.types";
import { ProductsGrid } from "@/features/store/ui/organisms/products-grid";
import { StoresToolbar } from "@/features/store/ui/organisms/sections/stores-toolbar";

const ProductViewDrawer = dynamic(() => import("@/features/store/ui/organisms/product-view-drawer"), {
  ssr: false,
  loading: () => null,
});

export default function StorePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="space-y-4">
      <StoresToolbar />

      <ProductsGrid products={fakeProducts} onOpenMobileProduct={setSelectedProduct} />

      {selectedProduct && (
        <ProductViewDrawer open onOpenChange={(v) => !v && setSelectedProduct(null)} product={selectedProduct} />
      )}
    </div>
  );
}
