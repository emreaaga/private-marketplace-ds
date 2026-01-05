import { PlusSquare, Package, Calculator, Receipt, CheckCircle, Clock } from "lucide-react";

import { mapOrderPayment } from "./mpordep";
import type { Order } from "./orders.type";

function InlineItem({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1">{children}</span>;
}

export function OrderPaymentDetails({ order }: { order: Order }) {
  const p = mapOrderPayment(order);

  return (
    <div className="w-full">
      <div className="text-muted-foreground flex items-center justify-between text-sm whitespace-nowrap tabular-nums">
        <InlineItem>
          <Package className="text-muted-foreground h-4 w-4" />
          Вес:
          <span className="text-foreground font-semibold">{p.weightKg} кг</span>
        </InlineItem>
        <InlineItem>
          <Calculator className="text-muted-foreground h-4 w-4" />
          Тариф:
          <span className="text-foreground font-semibold">${p.ratePerKg} / кг</span>
        </InlineItem>

        <InlineItem>
          <PlusSquare className="text-muted-foreground h-4 w-4" />
          Доп. услуги:
          <span className="text-foreground font-semibold">{p.extrasTotal}$</span>
        </InlineItem>

        <InlineItem>
          <Receipt className="text-muted-foreground h-4 w-4" />
          Итого:
          <span className="text-foreground font-semibold">${p.total}</span>
        </InlineItem>

        {p.paidOrigin > 0 && (
          <InlineItem>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
            Оплачено:
            <span className="font-semibold text-green-600">${p.paidOrigin}</span>
          </InlineItem>
        )}

        {p.remaining > 0 && (
          <InlineItem>
            <Clock className="text-muted-foreground h-4 w-4" />
            Остаток:
            <span className="font-semibold text-red-600">${p.remaining}</span>
          </InlineItem>
        )}
      </div>
    </div>
  );
}
