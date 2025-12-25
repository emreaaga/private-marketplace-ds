import { CartItem } from "../molecules/cart-item";

export function CartList({ items }: any) {
  return (
    <div className="bg-card overflow-hidden rounded-3xl border shadow-sm">
      {items.map((item: any, idx: number) => (
        <div key={item.id}>
          <CartItem item={item} />
          {idx !== items.length - 1 && <div className="border-border/60 mx-4 border-b" />}
        </div>
      ))}
    </div>
  );
}
