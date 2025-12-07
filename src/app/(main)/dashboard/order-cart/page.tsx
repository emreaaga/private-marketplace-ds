"use client";

import { useOrderCart } from "@/features/order-cart/lib/use-order-cart";
import { EmptyState } from "@/features/order-cart/ui/molecules/empty-state";
import { CartList } from "@/features/order-cart/ui/organisms/cart-list";
import { CartSummary } from "@/features/order-cart/ui/organisms/cart-summary";

export default function OrderCartPage() {
  const { items, isEmpty, updateQuantity } = useOrderCart();

  if (isEmpty) return <EmptyState />;

  return (
    <div className="w-full space-y-5 pt-4 pb-24">
      <h1 className="text-2xl font-semibold">Корзина</h1>

      <CartList items={items} updateQuantity={updateQuantity} />

      <CartSummary items={items} />
    </div>
  );
}
