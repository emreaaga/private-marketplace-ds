"use client";

import { moneyFmt } from "./utils";

type Props = {
  totalQuantity: number;
  totalPrice: number;
};

export function Totals({ totalQuantity, totalPrice }: Props) {
  return (
    <div className="flex shrink-0 justify-end gap-6 text-[12px] font-medium">
      <span>Штук: {totalQuantity.toLocaleString()}</span>
      <span>Итого: {moneyFmt(totalPrice)} $</span>
    </div>
  );
}
