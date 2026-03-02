"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { ItemUI } from "@/shared/types/order/item/item-ui";
import { Button } from "@/shared/ui/atoms/button";
import { Input } from "@/shared/ui/atoms/input";

interface RowProps {
  index: number;
  item: ItemUI;
  onUpdate: (patch: Partial<ItemUI>) => void;
  onRemove: () => void;
}

export function ProductRow({ index, item, onUpdate, onRemove }: RowProps) {
  const priceNum = Number(item.unit_price);
  const rowSum = priceNum > 0 && item.quantity > 0 ? (priceNum * item.quantity).toFixed(2) : "";

  const textStyle = "text-[10px] font-normal tabular-nums tracking-tight";

  return (
    <div className="group hover:bg-muted/40 border-muted/5 grid grid-cols-[28px_1fr_100px_100px_100px] items-center gap-1 border-b px-2 py-0.5 transition-colors">
      <div className="relative flex h-6 w-6 items-center justify-center">
        <span className={cn(textStyle, "text-muted-foreground/40 group-hover:hidden")}>{index + 1}</span>
        <button
          onClick={onRemove}
          className="hidden text-red-500/60 transition-colors group-hover:flex hover:text-red-500"
        >
          <Trash2 size={12} />
        </button>
      </div>

      <Input
        value={item.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
        placeholder="Товар..."
        className={cn(
          textStyle,
          "text-foreground/80 placeholder:text-muted-foreground/20 h-6 border-none bg-transparent p-0 shadow-none focus-visible:ring-0",
        )}
      />

      <div className="flex items-center justify-end">
        <Input
          type="text"
          inputMode="decimal"
          value={item.unit_price}
          onChange={(e) => onUpdate({ unit_price: e.target.value.replace(",", ".") })}
          className={cn(
            textStyle,
            "text-foreground/70 h-6 w-16 border-none bg-transparent p-0 text-right font-mono shadow-none focus-visible:ring-0",
          )}
        />
        <span className={cn(textStyle, "text-muted-foreground/30 ml-1 font-mono")}>$</span>
      </div>

      <div className="flex items-center justify-end gap-1 pr-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
          onClick={() => onUpdate({ quantity: Math.max(1, item.quantity - 1) })}
        >
          <Minus className="text-muted-foreground/40 h-3 w-3" />
        </Button>
        <span className={cn(textStyle, "text-muted-foreground min-w-[2.5ch] text-center font-mono")}>
          {item.quantity}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
          onClick={() => onUpdate({ quantity: item.quantity + 1 })}
        >
          <Plus className="text-muted-foreground/40 h-3 w-3" />
        </Button>
      </div>

      <div className={cn(textStyle, "text-foreground/70 pr-2 text-right font-mono")}>
        {rowSum} {rowSum && <span className="text-muted-foreground/30">$</span>}
      </div>
    </div>
  );
}
