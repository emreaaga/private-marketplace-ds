import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/shared/lib/utils";
import { formatMoney } from "@/shared/ui/molecules/format-money";

import { type Order } from "./test-order";

const BASE_STYLE = "text-[12px] font-medium";
const TOP_ROW_STYLE = "text-[10px] text-slate-400";
const BOTTOM_ROW_STYLE = "text-[12px] text-slate-900";

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
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className={TOP_ROW_STYLE}>{row.original.sender.name}</span>
        <span className={BOTTOM_ROW_STYLE}>{row.original.recipient.name}</span>
      </div>
    ),
  },

  {
    id: "phones",
    header: "Контакты",
    size: 130,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight tabular-nums">
        <span className={TOP_ROW_STYLE}>{row.original.sender.phone}</span>
        <span className={BOTTOM_ROW_STYLE}>{row.original.recipient.phone}</span>
      </div>
    ),
  },

  {
    id: "cities",
    header: "Города",
    size: 100,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className={TOP_ROW_STYLE}>{row.original.sender.city}</span>
        <span className={BOTTOM_ROW_STYLE}>{row.original.recipient.city}</span>
      </div>
    ),
  },

  {
    id: "couriers",
    header: "Курьер",
    size: 140,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className={TOP_ROW_STYLE}>Отп курьер</span>
        <span className={BOTTOM_ROW_STYLE}>Пол курьер</span>
      </div>
    ),
  },

  {
    id: "points",
    header: "Пункты",
    size: 140,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className={TOP_ROW_STYLE}>Пункт 1</span>
        <span className={BOTTOM_ROW_STYLE}>Пункт 2</span>
      </div>
    ),
  },

  {
    id: "customs",
    header: "Таможня",
    size: 120,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className={TOP_ROW_STYLE}>Отп тамж</span>
        <span className={BOTTOM_ROW_STYLE}>Пол тамж</span>
      </div>
    ),
  },

  {
    id: "flights",
    header: "Самолет",
    size: 100,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className={TOP_ROW_STYLE}>TR</span>
        <span className={BOTTOM_ROW_STYLE}>UZ</span>
      </div>
    ),
  },

  {
    id: "weight_price",
    header: "В/Ц",
    size: 90,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        {/* Верх: Вес (обычный цвет) */}
        {formatWeight(row.original.weight, cn(BASE_STYLE, "text-foreground"))}
        {/* Низ: Цена (приглушенный цвет для разделения) */}
        {formatMoney(row.original.finances.cargoPrice.toString(), cn(BASE_STYLE, "text-muted-foreground"))}
      </div>
    ),
  },

  {
    id: "extra_pay_exp",
    header: "О/Р",
    size: 90,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        {/* Верх: Доп. оплата */}
        {formatMoney(row.original.finances.extraPayment.toString(), cn(BASE_STYLE, "text-foreground"))}
        {/* Низ: Доп. расход */}
        {formatMoney(row.original.finances.extraExpense.toString(), cn(BASE_STYLE, "text-muted-foreground"))}
      </div>
    ),
  },

  {
    id: "deposit_total",
    header: "В/И",
    size: 90,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        {/* Верх: Взнос */}
        {formatMoney(row.original.finances.deposit.toString(), cn(BASE_STYLE, "text-foreground"))}
        {/* Низ: Итог */}
        {formatMoney(row.original.finances.total.toString(), cn(BASE_STYLE, "text-muted-foreground"))}
      </div>
    ),
  },
];
