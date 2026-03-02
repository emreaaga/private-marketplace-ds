"use client";

import { Plus } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { ItemUI } from "@/shared/types/order/item/item-ui";

import { ProductRow } from "./product-row";

interface ListProps {
  items: ItemUI[];
  onChange: (items: ItemUI[]) => void;
}

export function ProductList({ items, onChange }: ListProps) {
  const addItem = () => {
    // ФУНКЦИЯ ГЕНЕРАЦИИ ID:
    // crypto.randomUUID() работает только в Secure Context (HTTPS или localhost).
    // Для HTTP (по IP) используем fallback на основе Math.random.
    const generateId = () => {
      if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
      }
      // Резервный метод для работы по обычному HTTP (без SSL)
      return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    };

    onChange([
      ...items,
      {
        ui_id: generateId(),
        name: "",
        quantity: 1,
        unit_price: "",
        category: "",
      },
    ]);
  };

  const updateItem = (ui_id: string, patch: Partial<ItemUI>) => {
    onChange(items.map((it) => (it.ui_id === ui_id ? { ...it, ...patch } : it)));
  };

  const removeItem = (ui_id: string) => {
    onChange(items.filter((it) => it.ui_id !== ui_id));
  };
  const headerLabelStyle = "text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tight";

  return (
    <div className="bg-background flex h-full flex-col overflow-hidden">
      <div className="bg-muted/5 flex items-center gap-2 border-b border-dashed px-3 py-1.5">
        <div className="flex w-7 shrink-0 justify-center">
          <button
            onClick={addItem}
            className="text-primary/60 hover:text-primary transition-all hover:scale-110 active:scale-95"
            title="Добавить позицию"
          >
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>

        <div className={cn(headerLabelStyle, "flex-[2.5]")}>Наименование</div>
        <div className={cn(headerLabelStyle, "flex-1 text-right")}>Цена</div>
        <div className={cn(headerLabelStyle, "flex-1 text-center")}>Кол-во</div>
        <div className={cn(headerLabelStyle, "flex-1 pr-1 text-right")}>Итого</div>
      </div>

      <div className="custom-scrollbar divide-muted/10 flex-1 divide-y overflow-y-auto outline-none">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground/40 text-[11px] font-medium italic">Список пуст</p>
            <button
              onClick={addItem}
              className="text-primary/50 hover:text-primary mt-1 text-[9px] font-bold tracking-widest uppercase transition-colors"
            >
              + Добавить первый товар
            </button>
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
