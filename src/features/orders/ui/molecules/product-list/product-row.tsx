"use client";

import { Minus, Plus } from "lucide-react";

import type { ItemUI } from "@/shared/types/order/item/item-ui";
import { Button } from "@/shared/ui/atoms/button";

import { calcRowSum, moneyFmt, toMoney } from "./utils";

type Props = {
  index: number;
  item: ItemUI;
  onChangeQuantity: (delta: number) => void;
  onRemove: () => void;
  readOnly?: boolean; // <-- Добавили флаг
};

export function ProductRow({ index, item, onChangeQuantity, onRemove, readOnly = false }: Props) {
  const rowSum = calcRowSum(item.unit_price, item.quantity);
  const unitPriceNumber = toMoney(item.unit_price, 0);

  return (
    <div className="group grid grid-cols-[28px_1fr_92px_110px_110px] items-center gap-1 px-2 py-1 text-[11px]">
      {/* 1. Колонка индекса / удаления */}
      {readOnly ? (
        <div className="text-muted-foreground flex h-6 w-6 items-center justify-center text-[10px] tabular-nums">
          {index}
        </div>
      ) : (
        <button
          type="button"
          onClick={onRemove}
          title="Удалить"
          className="relative flex h-6 w-6 items-center justify-center rounded hover:bg-red-500/10"
        >
          <span className="text-muted-foreground text-[10px] tabular-nums group-hover:text-red-500 group-hover:opacity-0">
            {index}
          </span>
          <span className="absolute text-red-500 opacity-0 group-hover:opacity-100">🗑</span>
        </button>
      )}

      {/* 2. Название */}
      <div className="min-w-0 truncate font-medium">{item.name}</div>

      {/* 3. Цена */}
      <div className="text-right font-mono tabular-nums">{moneyFmt(unitPriceNumber)} $</div>

      {/* 4. Количество (с кнопками или без) */}
      <div className="inline-flex items-center justify-end gap-0.5 pr-2">
        {!readOnly && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0"
            onClick={() => onChangeQuantity(-1)}
            disabled={item.quantity <= 1}
            title="Уменьшить"
          >
            <Minus className="h-3 w-3" />
          </Button>
        )}

        <span className="min-w-[2ch] text-center font-mono tabular-nums">{item.quantity}</span>

        {!readOnly && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-5 w-5 p-0"
            onClick={() => onChangeQuantity(1)}
            title="Увеличить"
          >
            <Plus className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* 5. Сумма */}
      <div className="text-right font-medium tabular-nums">{moneyFmt(rowSum)} $</div>
    </div>
  );
}
