import { CartItem } from "../molecules/cart-item";

export function CartList({ items, updateQuantity }: any) {
  return (
    <div className="bg-card overflow-hidden rounded-3xl border shadow-sm">
      {items.map((item: any, idx: number) => (
        <div key={item.id}>
          <CartItem
            item={item}
            onIncrease={() => updateQuantity(item.id, +1)}
            onDecrease={() => updateQuantity(item.id, -1)}
          />
          {idx !== items.length - 1 && <div className="border-border/60 mx-4 border-b" />}
        </div>
      ))}
    </div>
  );
}
