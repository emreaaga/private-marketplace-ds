import { ColumnDef } from "@tanstack/react-table";

import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

import { type Order } from "./test-order";

const COMMON_STYLE = "text-[12px] font-medium text-slate-700";

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
        <span className="text-[13px]">Клнт. 1</span>
        <span className="text-[11px] text-slate-400">Клнт. 2</span>
      </div>
    ),
  },

  {
    id: "couriers",
    header: "Курьер",
    size: 140,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className="text-[13px]">Отп курьер</span>
        <span className="text-[11px] text-slate-400">Пол курьер</span>
      </div>
    ),
  },

  {
    id: "points",
    header: "Пункты",
    size: 140,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className="text-[13px]">Пункт 1</span>
        <span className="text-[11px] text-slate-400">Пункт 2</span>
      </div>
    ),
  },

  {
    id: "customs",
    header: "Таможня",
    size: 120,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className="text-[13px]">Отп тамж</span>
        <span className="text-[11px] text-slate-400">Пол тамж</span>
      </div>
    ),
  },

  {
    id: "flights",
    header: "Самолет",
    size: 100,
    cell: () => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        <span className="text-[13px]">TR-IST</span>
        <span className="text-[11px] font-medium text-slate-400">UZ-SKD</span>
      </div>
    ),
  },

  // 1. ВЕС / ЦЕНА (В/Ц)
  {
    id: "weight_price",
    header: "В/Ц",
    size: 90,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        {formatWeight(row.original.weight, "default", COMMON_STYLE)}
        {formatMoney(row.original.finances.cargoPrice.toString(), COMMON_STYLE)}
      </div>
    ),
  },

  // 2. ДОП. ОПЛАТА / ДОП. РАСХОД (О/Р)
  {
    id: "extra_pay_exp",
    header: "О/Р",
    size: 90,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        {formatMoney(row.original.finances.extraPayment.toString(), COMMON_STYLE)}
        {formatMoney(row.original.finances.extraExpense.toString(), COMMON_STYLE)}
      </div>
    ),
  },

  // 3. ВЗНОС / ИТОГ (В/И)
  {
    id: "deposit_total",
    header: "В/И",
    size: 90,
    cell: ({ row }) => (
      <div className="flex flex-col gap-0 py-0.5 leading-tight">
        {formatMoney(row.original.finances.deposit.toString(), COMMON_STYLE)}
        {formatMoney(row.original.finances.total.toString(), COMMON_STYLE)}
      </div>
    ),
  },
];
