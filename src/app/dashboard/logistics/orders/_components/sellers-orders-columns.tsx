import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/shared/lib/utils";
import { formatMoney } from "@/shared/ui/molecules/format-money";

import { type Order } from "./test-order";

const BASE_STYLE = "text-[12px] font-medium";

const formatWeight = (value: number | string | undefined | null, className?: string) => {
  const num = Number(value);

  if (value === null || value === undefined || isNaN(num)) {
    return <span className="text-muted-foreground">—</span>;
  }

  const [int, frac] = num.toFixed(2).split(".");

  return (
    <div className={cn("flex items-baseline tabular-nums", className)}>
      {/* Буква К перед числом */}
      <span className="mr-1 text-[0.8em] font-bold opacity-70">К</span>
      <span>{int}</span>
      <span className="text-[0.75em] opacity-50">.{frac}</span>
    </div>
  );
};

export const getSellersOrdersColumns = (): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "ID",
    size: 50,
    cell: ({ row }) => <span className="text-xs font-medium tabular-nums">{row.original.id}</span>,
  },

  {
    id: "clients",
    header: "Клиент",
    size: 150,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className="text-[12px]">Клнт. 1</span>
        <span className="text-[12px]">Клнт. 2</span>
      </div>
    ),
  },

  {
    id: "couriers",
    header: "Курьер",
    size: 140,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className="text-[12px]">Отп курьер</span>
        <span className="text-[12px]">Пол курьер</span>
      </div>
    ),
  },

  {
    id: "points",
    header: "Пункты",
    size: 140,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className="text-[12px]">Пункт 1</span>
        <span className="text-[12px]">Пункт 2</span>
      </div>
    ),
  },

  {
    id: "customs",
    header: "Таможня",
    size: 120,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className="text-[12px]">Отп тамж</span>
        <span className="text-[12px]">Пол тамж</span>
      </div>
    ),
  },

  {
    id: "flights",
    header: "Самолет",
    size: 100,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className="text-[12px]">TR-IST</span>
        <span className="text-[12px]">UZ-SKD</span>
      </div>
    ),
  },

  {
    id: "weight_price",
    header: "В/Ц",
    size: 90,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        {/* Вес: Морская волна (Teal) — отличается от всех денежных знаков */}
        {formatWeight(row.original.weight, cn(BASE_STYLE, "text-teal-600/90"))}
        {/* Цена: Глубокий синий (Indigo) — стандарт информации */}
        {formatMoney(row.original.finances.cargoPrice.toString(), cn(BASE_STYLE, "text-indigo-600/80"))}
      </div>
    ),
  },

  {
    id: "extra_pay_exp",
    header: "О/Р",
    size: 90,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        {/* Доп. оплата: Чистый зеленый (Emerald) */}
        {formatMoney(row.original.finances.extraPayment.toString(), cn(BASE_STYLE, "text-emerald-600/90"))}
        {/* Доп. расход: Мягкий красный (Rose) */}
        {formatMoney(row.original.finances.extraExpense.toString(), cn(BASE_STYLE, "text-rose-500/80"))}
      </div>
    ),
  },

  {
    id: "deposit_total",
    header: "В/И",
    size: 90,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        {/* Взнос: Нейтральный (Slate) — показывает, что это уже в прошлом */}
        {formatMoney(row.original.finances.deposit.toString(), cn(BASE_STYLE, "text-slate-500"))}
        {/* Итог: Фиолетовый (Violet) — акцент на финальной цифре */}
        {formatMoney(row.original.finances.total.toString(), cn(BASE_STYLE, "text-amber-700/70"))}
      </div>
    ),
  },
];
