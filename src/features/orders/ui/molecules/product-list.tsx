"use client";
import React from "react";

import { X } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { ScrollArea, ScrollBar } from "@/shared/ui/atoms/scroll-area";
import { QuantityStepper } from "@/shared/ui/molecules/quantity-stepper";

import { MOCK_ITEMS, OrderItem } from "../fake-items";

export function ProductList() {
  const [items, setItems] = React.useState<OrderItem[]>(MOCK_ITEMS);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.units * i.quantity, 0);
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  // Мобильная версия - карточки
  if (isMobile) {
    return (
      <>
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Товары</span>
            <Button variant="outline" size="sm" className="h-8">
              + Добавить
            </Button>
          </div>

          <ScrollArea className="h-72">
            <div className="space-y-2 pr-4">
              {items.map((p, idx) => (
                <div key={p.id} className="bg-card relative rounded-lg border p-3 shadow-sm">
                  {/* Номер и кнопка удаления */}
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-muted flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                        {idx + 1}
                      </span>
                      <div className="text-muted-foreground font-mono text-xs">{p.id}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground h-8 w-8"
                      onClick={() => remove(p.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Название товара */}
                  <div className="mb-3 text-sm font-medium">{p.name}</div>

                  {/* Количество и цена */}
                  <div className="flex items-center justify-between">
                    <QuantityStepper
                      value={p.quantity}
                      onChange={(next) =>
                        setItems((prev) => prev.map((i) => (i.id === p.id ? { ...i, quantity: next } : i)))
                      }
                    />
                    <div className="text-base font-semibold tabular-nums">
                      {(p.price * p.units * p.quantity).toLocaleString()} $
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>

        {/* Итоговая панель - мобильная версия */}
        <div className="bg-muted/40 mt-4 space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Статус</span>
            <Badge variant="secondary">Ожидание</Badge>
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-muted-foreground text-sm">Всего позиций</span>
            <span className="font-medium">{totalQuantity}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-base font-medium">Итого</span>
            <span className="text-xl font-bold tabular-nums">{total.toLocaleString()} $</span>
          </div>
        </div>
      </>
    );
  }

  // Десктопная версия - таблица
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
                  {(p.price * p.units * p.quantity).toLocaleString()} $
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
