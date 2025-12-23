import { useIsMobile } from "@/shared/hooks/use-mobile";

import { CartTable } from "../organisms/cart-table";

import { CartList } from "./cart-list";

export function ResponsiveCart({ items, updateQuantity }: any) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) return null;

  return isMobile ? (
    <CartList items={items} updateQuantity={updateQuantity} />
  ) : (
    <CartTable items={items} updateQuantity={updateQuantity} />
  );
}
