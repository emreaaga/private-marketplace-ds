"use client";

import dynamic from "next/dynamic";

import { useOrderCart } from "@/features/order-cart/lib/use-order-cart";
import { EmptyState } from "@/features/order-cart/ui/molecules/empty-state";
import { CartSummary } from "@/features/order-cart/ui/organisms/cart-summary";
import { ResponsiveCart } from "@/features/order-cart/ui/organisms/responsive-cart";

export default function SellerOrdersCartClient() {
  const { items, isEmpty } = useOrderCart();

  if (isEmpty) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-2 sm:space-y-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
        <ResponsiveCart items={items} />

        <div className="h-fit md:sticky md:top-24">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
