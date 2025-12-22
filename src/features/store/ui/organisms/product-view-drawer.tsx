"use client";

import { ProductImageCard } from "@/features/seller/ui/molecules/card-view-drawer/product-image-card";
import { ProductActionBar } from "@/features/seller/ui/organisms/card-view-drawer/product-action-bar";
import { ProductDetailsSection } from "@/features/seller/ui/organisms/card-view-drawer/product-details-section";
import { ProductHeader } from "@/features/seller/ui/organisms/card-view-drawer/product-header";
import { Drawer, DrawerContent } from "@/shared/ui/atoms/drawer";

import { Product } from "../../../seller/types/product.types";

interface ProductViewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function ProductViewDrawer({ open, onOpenChange, product }: ProductViewDrawerProps) {
  if (!product) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh] rounded-t-3xl bg-white p-0">
        <div className="max-h-[95vh] overflow-y-auto pb-32">
          <ProductHeader name={product.name} category={product.category} />
          <ProductImageCard photo={product.photo_url} quantity={product.quantity} name={product.name} />
          <ProductDetailsSection product={product} />
        </div>

        <ProductActionBar quantity={product.quantity} />
      </DrawerContent>
    </Drawer>
  );
}
