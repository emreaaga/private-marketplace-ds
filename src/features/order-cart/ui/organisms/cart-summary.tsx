import { CheckCircle2 } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

export function CartSummary({ items }: { items: any[] }) {
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="bg-card rounded-3xl border px-5 py-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span className="text-muted-foreground text-sm">
            Выбрано: <span className="text-foreground font-semibold">{count}</span>
          </span>
        </div>

        <div className="text-right">
          <span className="text-muted-foreground block text-xs">Итоговая сумма</span>
          <span className="block text-xl font-bold tracking-tight">{total}$</span>
        </div>
      </div>

      <Button className="w-full rounded-xl py-4 text-base font-semibold">Подтвердить заказ</Button>
    </div>
  );
}
