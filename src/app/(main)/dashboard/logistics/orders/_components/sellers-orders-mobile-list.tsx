import { Order } from "./orders.type";
import { SellersOrdersMobileCard } from "./sellers-orders-mobile-card";

interface Props {
  data: Order[];
}

export function SellersOrdersMobileList({ data }: Props) {
  if (!data.length) {
    return (
      <div className="text-muted-foreground rounded-md border border-dashed p-6 text-center text-sm">Заказов нет</div>
    );
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-lg border md:hidden">
      <div className="divide-border divide-y">
        {data.map((order) => (
          <SellersOrdersMobileCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
