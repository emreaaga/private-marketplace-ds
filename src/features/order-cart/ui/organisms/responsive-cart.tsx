import { CartTable } from "../organisms/cart-table";

import { CartList } from "./cart-list";

export function ResponsiveCart({ items, updateQuantity }: any) {
  return (
    <>
      <div className="block md:hidden">
        <CartList items={items} updateQuantity={updateQuantity} />
      </div>

      <div className="hidden md:block">
        <CartTable items={items} updateQuantity={updateQuantity} />
      </div>
    </>
  );
}
