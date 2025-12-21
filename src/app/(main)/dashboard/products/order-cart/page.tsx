"use client";

import { useOrderCart } from "@/features/order-cart/lib/use-order-cart";
import { EmptyState } from "@/features/order-cart/ui/molecules/empty-state";
import { CartSummary } from "@/features/order-cart/ui/organisms/cart-summary";
import { ResponsiveCart } from "@/features/order-cart/ui/organisms/responsive-cart";
import { OrdersCartHeader } from "@/features/order-cart/ui/organisms/sections/orders-cart-header";

export default function OrderCartPage() {
  const { items, isEmpty, updateQuantity } = useOrderCart();

  if (isEmpty) return <EmptyState />;

  return (
    <div className="space-y-6">
      <OrdersCartHeader />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
        <ResponsiveCart items={items} updateQuantity={updateQuantity} />

        <div className="h-fit md:sticky md:top-24">
          <CartSummary items={items} />
        </div>
      </div>
    </div>
  );
}
