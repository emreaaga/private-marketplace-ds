"use client";

import { useState } from "react";

import { fakeProducts } from "@/features/seller/fake-products";
import type { Product } from "@/features/seller/types/product.types";
import { ProductViewDrawer } from "@/features/store/ui/organisms/product-view-drawer";
import { ProductsGrid } from "@/features/store/ui/organisms/products-grid";
import { StoresToolbar } from "@/features/store/ui/organisms/sections/stores-toolbar";

export default function StorePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="space-y-6">
      <StoresToolbar />
      <ProductsGrid products={fakeProducts} onOpenMobileProduct={setSelectedProduct} />

      <ProductViewDrawer
        open={!!selectedProduct}
        onOpenChange={(v) => !v && setSelectedProduct(null)}
        product={selectedProduct}
      />
    </div>
  );
}
