"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { ItemUI } from "@/shared/types/order/item/item-ui";

interface RowProps {
  index: number;
  item: ItemUI;
  onUpdate: (patch: Partial<ItemUI>) => void;
  onRemove: () => void;
}

export function ProductRow({ index, item, onUpdate, onRemove }: RowProps) {
  const priceNum = Number(item.unit_price);
  const rowSum =
    priceNum > 0 && item.quantity > 0
      ? (priceNum * item.quantity).toLocaleString("ru-RU", { minimumFractionDigits: 2 })
      : "0.00";

  const labelStyle = "text-[9px] font-bold text-muted-foreground/40 uppercase tracking-tighter";
  const inputStyle = "bg-transparent text-[13px] focus:outline-none focus:ring-0 placeholder:text-muted-foreground/20";

  return (
    <div className="group hover:bg-secondary/40 hover:border-border/30 flex items-center gap-2 border-b border-transparent px-3 py-0.5 transition-colors">
      <div className="relative flex h-6 w-7 shrink-0 items-center justify-center">
        <span className="text-muted-foreground/40 text-[10px] font-medium transition-opacity group-hover:opacity-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <button
          onClick={onRemove}
          className="hover:text-destructive absolute inset-0 flex items-center justify-center opacity-0 transition-all group-hover:opacity-100"
        >
          <Trash2 size={13} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-[2.5]">
        <input
          value={item.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Название позиции..."
          className={cn(inputStyle, "w-full font-medium")}
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-1">
        <input
          type="text"
          inputMode="decimal"
          value={item.unit_price}
          onChange={(e) => onUpdate({ unit_price: e.target.value.replace(",", ".") })}
          placeholder="0.00"
          className={cn(inputStyle, "w-16 text-right font-mono tracking-tight")}
        />
        <span className={labelStyle}>$</span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="group-hover:bg-background/80 flex items-center rounded-md px-1 transition-opacity">
          <button
            onClick={() => onUpdate({ quantity: Math.max(1, item.quantity - 1) })}
            className="text-muted-foreground/50 hover:text-foreground flex h-5 w-5 items-center justify-center transition-colors active:scale-90"
          >
            <Minus size={10} strokeWidth={3} />
          </button>

          <span className="min-w-6 text-center font-mono text-[12px] font-semibold">{item.quantity}</span>

          <button
            onClick={() => onUpdate({ quantity: item.quantity + 1 })}
            className="text-muted-foreground/50 hover:text-foreground flex h-5 w-5 items-center justify-center transition-colors active:scale-90"
          >
            <Plus size={10} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="text-foreground/80 flex flex-1 justify-end font-mono text-[13px] font-bold tracking-tighter">
        {rowSum}
        <span className={cn(labelStyle, "ml-1 self-center")}>$</span>
      </div>
    </div>
  );
}
