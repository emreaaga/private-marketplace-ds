"use client";

import { Plus } from "lucide-react";

import { ItemUI } from "@/shared/types/order/item/item-ui";

import { ProductRow } from "./product-row";

interface ListProps {
  items: ItemUI[];
  onChange: (items: ItemUI[]) => void;
}

export function ProductList({ items, onChange }: ListProps) {
  const addItem = () => {
    onChange([...items, { ui_id: crypto.randomUUID(), name: "", quantity: 1, unit_price: "", category: "" }]);
  };

  const updateItem = (ui_id: string, patch: Partial<ItemUI>) => {
    onChange(items.map((it) => (it.ui_id === ui_id ? { ...it, ...patch } : it)));
  };

  const removeItem = (ui_id: string) => {
    onChange(items.filter((it) => it.ui_id !== ui_id));
  };

  return (
    <div className="bg-background flex h-full flex-col overflow-hidden">
      <div className="text-muted-foreground/60 bg-muted/10 grid grid-cols-[28px_1fr_100px_100px_100px] items-center gap-1 border-b border-dashed px-2 py-1.5 text-[10px] font-bold tracking-widest uppercase">
        <div className="flex justify-center">
          <button
            onClick={addItem}
            className="text-primary transition-transform hover:scale-125 active:scale-95"
            title="Добавить товар"
          >
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>
        <div>Наименование</div>
        <div className="pr-4 text-right">Цена</div>
        <div className="pr-4 text-right">Кол-во</div>
        <div className="pr-2 text-right">Сумма</div>
      </div>

      <div className="custom-scrollbar divide-muted/20 flex-1 divide-y divide-dashed overflow-y-auto font-normal">
        {items.length === 0 ? (
          <div className="text-muted-foreground/30 flex flex-col items-center justify-center py-12 text-[11px]">
            <p className="italic">Список пуст</p>
            <p className="text-[9px]">Нажмите на плюс выше</p>
          </div>
        ) : (
          items.map((item, index) => (
            <ProductRow
              key={item.ui_id}
              index={index}
              item={item}
              onUpdate={(patch) => updateItem(item.ui_id, patch)}
              onRemove={() => removeItem(item.ui_id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
