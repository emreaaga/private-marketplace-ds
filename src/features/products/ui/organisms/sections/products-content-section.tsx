"use client";

import { Package } from "lucide-react";

import type { Product } from "@/features/products/types/product.types";
import { ProductsGrid } from "@/features/products/ui/organisms/products-grid";
import { ProductsTable } from "@/features/products/ui/organisms/products-table";
import { TabsContent } from "@/shared/ui/atoms/tabs";

interface ProductsContentSectionProps {
  isEmpty: boolean;
  products: Product[];
  isMobile: boolean;
  onOpenMobileProduct: (product: Product) => void;
}

export function ProductsContentSection({
  isEmpty,
  products,
  isMobile,
  onOpenMobileProduct,
}: ProductsContentSectionProps) {
  if (isEmpty) {
    return (
      <div className="mt-14 flex flex-col items-center gap-3 text-center">
        <Package className="text-muted-foreground h-16 w-16" />
        <h3 className="text-xl font-semibold">Нет товаров</h3>
        <p className="text-muted-foreground max-w-sm text-sm">Попробуй изменить фильтры или добавь первый товар.</p>
      </div>
    );
  }

  return (
    <>
      <TabsContent value="grid" className="mt-8">
        <ProductsGrid products={products} isMobile={isMobile} onOpenMobileProduct={onOpenMobileProduct} />
      </TabsContent>

      <TabsContent value="table" className="mt-8">
        <ProductsTable products={products} />
      </TabsContent>
    </>
  );
}
