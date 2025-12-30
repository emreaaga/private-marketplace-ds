"use client";
import React from "react";

import { Button } from "@/shared/ui/atoms/button";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

import { MOCK_ITEMS, OrderItem } from "../../../fake-items";

type DraftItem = {
  id: string;
  name: string;
  price: string;
  quantity: string;
  units: string;
  fromId: boolean;
};

const ID_MAP: Record<string, Omit<OrderItem, "id">> = {
  A001Z100001: {
    name: "Футболка",
    price: 20,
    quantity: 1,
    units: 10,
    series: 1,
  },
  A001Z100002: {
    name: "Брюки",
    price: 66,
    quantity: 1,
    units: 11,
    series: 1,
  },
};

export function ProductList() {
  const [items, setItems] = React.useState<OrderItem[]>(MOCK_ITEMS);

  const [draft, setDraft] = React.useState<DraftItem>({
    id: "",
    name: "",
    price: "",
    quantity: "",
    units: "",
    fromId: false,
  });

  const totalSeries = items.reduce((s, i) => s + i.quantity, 0);

  const totalUnits = items.reduce((s, i) => s + i.quantity * i.units, 0);

  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity * i.units, 0);

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const changeQty = (id: string, delta: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)));
  };

  const onIdChange = (id: string) => {
    const value = id.toUpperCase();

    if (value in ID_MAP) {
      const item = ID_MAP[value];
      setDraft({
        id: value,
        name: item.name,
        price: String(item.price),
        quantity: String(item.quantity),
        units: String(item.units),
        fromId: true,
      });
    } else {
      setDraft((d) => ({
        ...d,
        id: value,
        fromId: false,
      }));
    }
  };

  const addDraft = () => {
    if (!draft.id.trim() && !draft.name.trim()) return;

    setItems((prev) => [
      ...prev,
      {
        id: draft.id.trim() || crypto.randomUUID(),
        name: draft.name.trim() || "Без названия",
        price: Number(draft.price || 0),
        quantity: Number(draft.quantity || 1),
        units: Number(draft.units || 1),
        series: 1,
      },
    ]);

    setDraft({
      id: "",
      name: "",
      price: "",
      quantity: "",
      units: "",
      fromId: false,
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-1">
      <ScrollArea className="flex-1">
        <ul className="divide-muted divide-y">
          {items.map((p, index) => (
            <li key={p.id} className="flex min-w-0 items-center gap-2 py-1 text-[11px]">
              <div className="flex min-w-0 flex-1 items-center gap-6 overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground h-4 w-4 shrink-0 font-mono text-[11px]"
                  onClick={() => remove(p.id)}
                >
                  X{index + 1}
                </Button>

                <span className="text-muted-foreground truncate font-mono">{p.id}</span>

                <span className="truncate">{p.name}</span>

                <span className="text-muted-foreground font-mono">${p.price}</span>

                <div className="text-muted-foreground flex items-center gap-0.5 font-mono">
                  <Button variant="ghost" size="icon" className="h-3 w-3 shrink-0" onClick={() => changeQty(p.id, -1)}>
                    −
                  </Button>

                  <span className="tabular-nums">{p.quantity}</span>

                  <Button variant="ghost" size="icon" className="h-3 w-3 shrink-0" onClick={() => changeQty(p.id, 1)}>
                    +
                  </Button>
                </div>
                <span className="text-muted-foreground font-mono">{p.series * p.quantity}</span>
              </div>

              <div className="w-16 shrink-0 text-right font-medium tabular-nums">
                {(p.price * p.units * p.quantity).toLocaleString()} $
              </div>
            </li>
          ))}

          <li className="text-muted-foreground flex min-w-0 items-center gap-2 py-1 text-[11px]">
            <span className="w-4 shrink-0" />

            <input
              className="h-5 w-28 bg-transparent font-mono outline-none"
              placeholder="ID"
              value={draft.id}
              onChange={(e) => onIdChange(e.target.value)}
            />

            <input
              className="h-5 min-w-[120px] flex-1 bg-transparent outline-none"
              placeholder="Название"
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            />

            <input
              className="h-5 w-10 bg-transparent text-right outline-none"
              placeholder="Цена"
              value={draft.price}
              disabled={draft.fromId}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  price: e.target.value.replace(/[^\d]/g, ""),
                }))
              }
            />

            <input
              className="h-5 w-8 bg-transparent text-right outline-none"
              placeholder="Кол"
              value={draft.quantity}
              disabled={draft.fromId}
              onChange={(e) => setDraft((d) => ({ ...d, quantity: e.target.value }))}
            />

            <input
              className="h-5 w-8 bg-transparent text-right outline-none"
              placeholder="Сер"
              value={draft.units}
              disabled={draft.fromId}
              onChange={(e) => setDraft((d) => ({ ...d, units: e.target.value }))}
            />

            <Button variant="ghost" size="icon" className="h-4 w-4 shrink-0" onClick={addDraft}>
              +
            </Button>
          </li>
        </ul>
      </ScrollArea>
      <div className="flex shrink-0 justify-end gap-6 text-[12px] font-medium">
        <span>Серии: {totalSeries.toLocaleString()}</span>
        <span>Штук: {totalUnits.toLocaleString()}</span>
        <span>Итого: {totalPrice.toLocaleString()} $</span>
      </div>
    </div>
  );
}
