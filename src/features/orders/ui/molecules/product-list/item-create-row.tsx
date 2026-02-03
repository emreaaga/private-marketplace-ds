"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";
import type { ItemCreateForm } from "@/shared/types/order/item/item-create.form";
import { Input } from "@/shared/ui/atoms/input";

import { moneyFmt, toInt, toMoney } from "./utils";

type Props = {
  index: number;
  value: ItemCreateForm;
  onChange: (patch: Partial<ItemCreateForm>) => void;

  onAutoCommit: () => void;
  onRemove: () => void;
  autoFocus?: boolean;
};

export function ItemCreateRow({ index, value, onChange, onAutoCommit, onRemove, autoFocus }: Props) {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const qtyRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus) nameRef.current?.focus();
  }, [autoFocus]);

  const isComplete =
    value.name.trim().length > 0 && value.unit_price.trim().length > 0 && value.quantity.trim().length > 0;

  const onBlurCapture = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    const row = rowRef.current;

    if (row && next && row.contains(next)) return;

    if (isComplete) onAutoCommit();
  };

  const onKeyDownName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      priceRef.current?.focus();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onRemove();
    }
  };

  const onKeyDownPrice = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      qtyRef.current?.focus();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onRemove();
    }
  };

  const onKeyDownQty = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      qtyRef.current?.blur();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onRemove();
    }
  };

  const qtyForSum = value.quantity.trim() ? Math.max(1, toInt(value.quantity, 1)) : 0;
  const sum = toMoney(value.unit_price, 0) * qtyForSum;

  return (
    <div
      ref={rowRef}
      onBlurCapture={onBlurCapture}
      className="group grid grid-cols-[28px_1fr_92px_110px_110px] items-center gap-1 px-2 py-1 text-[11px]"
    >
      <button
        type="button"
        onClick={onRemove}
        title="Удалить строку"
        className="relative flex h-6 w-6 items-center justify-center rounded hover:bg-red-500/10"
      >
        <span className="text-muted-foreground text-[10px] tabular-nums group-hover:text-red-500 group-hover:opacity-0">
          {index}
        </span>
        <span className="absolute text-red-500 opacity-0 group-hover:opacity-100">🗑</span>
      </button>

      <Input
        ref={nameRef}
        className="h-7 border-none bg-transparent px-1 text-[11px] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Название"
        value={value.name}
        onChange={(e) => onChange({ name: e.target.value })}
        onKeyDown={onKeyDownName}
      />

      <div className="relative">
        <Input
          ref={priceRef}
          className={cn(
            "h-7 border-none bg-transparent px-1 pr-1 pl-4 text-right text-[11px] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
            !value.name.trim() && "opacity-70",
          )}
          placeholder="Цена"
          inputMode="decimal"
          value={value.unit_price}
          onChange={(e) => onChange({ unit_price: e.target.value.replace(/[^\d.,]/g, "") })}
          onKeyDown={onKeyDownPrice}
        />
      </div>

      <div className="relative">
        <Input
          ref={qtyRef}
          className="h-7 border-none bg-transparent px-1 pr-1 pl-5 text-right text-[11px] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Кол-во"
          inputMode="numeric"
          value={value.quantity}
          onChange={(e) => onChange({ quantity: e.target.value.replace(/[^\d]/g, "") })}
          onKeyDown={onKeyDownQty}
        />
      </div>

      <div className="text-muted-foreground text-right tabular-nums">{moneyFmt(sum)} $</div>
    </div>
  );
}
