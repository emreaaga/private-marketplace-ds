"Use client";

import React from "react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { ScrollArea, ScrollBar } from "@/shared/ui/atoms/scroll-area";
import { QuantityStepper } from "@/shared/ui/molecules/quantity-stepper";

import { MOCK_ITEMS, OrderItem } from "../fake-items";

export function ProductList() {
  const [items, setItems] = React.useState<OrderItem[]>(MOCK_ITEMS);

  const total = items.reduce((sum, i) => sum + i.price * i.units * i.quantity, 0);
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <>
      <div className="space-y-2 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs font-medium">Товары</span>

          <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
            + Добавить
          </Button>
        </div>
        <ScrollArea className="h-64">
          <div className="divide-y">
            {items.map((p, idx) => (
              <div key={p.id} className="flex items-center gap-2 px-2 py-1.5">
                <div className="text-muted-foreground w-4 shrink-0 text-right text-xs">{idx + 1}</div>

                <div className="min-w-0 flex-1">
                  <div title={p.id} className="truncate font-mono text-xs text-[10px]">
                    {p.id}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs">{p.name}</div>
                </div>

                <div className="flex items-center gap-1">
                  <QuantityStepper
                    value={p.quantity}
                    onChange={(next) =>
                      setItems((prev) => prev.map((i) => (i.id === p.id ? { ...i, quantity: next } : i)))
                    }
                  />
                </div>

                <div className="w-16 text-right text-xs font-medium whitespace-nowrap">
                  {p.price * p.units * p.quantity} $
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground h-6 w-6"
                  onClick={() => remove(p.id)}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>

      <div className="bg-muted/40 mt-4 flex items-center justify-between rounded-lg p-3">
        <div className="text-sm">
          Статус: <Badge variant="secondary">Ожидание</Badge>
        </div>

        <div className="flex items-baseline gap-4 tabular-nums">
          <div className="text-muted-foreground text-sm">
            Всего позиций: <span className="font-medium">{totalQuantity}</span>
          </div>

          <div className="text-lg font-semibold">Итого: {total.toLocaleString()} $</div>
        </div>
      </div>
    </>
  );
}
