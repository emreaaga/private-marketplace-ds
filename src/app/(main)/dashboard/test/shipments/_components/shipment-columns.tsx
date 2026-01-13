import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/shared/ui/atoms/badge";

import { formatMoney, formatWeight } from "../../_components/finance";

import { Shipment, SHIPMENT_STATUS_META } from "./shipment-types";

export const ShipmentsColumns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "id",
    header: "Отправка",
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}</span>,
  },
  {
    accessorKey: "postCompany",
    header: "Почта",
  },
  {
    accessorKey: "ordersCount",
    header: "Заказы",
    meta: { align: "right" },
  },
  {
    accessorKey: "totalWeightKg",
    header: "Вес",
    meta: { align: "right" },
    cell: ({ row }) => formatWeight(row.original.totalWeightKg),
  },
  {
    accessorKey: "tariffPerKgUsd",
    header: "Тариф",
    meta: { align: "right" },
    cell: ({ row }) => formatMoney(row.original.tariffPerKgUsd),
  },
  {
    accessorKey: "incomeUsd",
    header: "Доход",
    meta: { align: "right" },
    cell: ({ row }) => formatMoney(row.original.incomeUsd),
  },
  {
    accessorKey: "expensesUsd",
    header: "Расходы",
    meta: { align: "right" },
    cell: ({ row }) => formatMoney(row.original.expensesUsd),
  },
  {
    id: "balance",
    header: "Баланс",
    cell: ({ row }) => {
      const balance = row.original.incomeUsd - row.original.expensesUsd;
      return <span className={balance < 0 ? "text-red-600" : "text-green-600"}>{formatMoney(balance)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const meta = SHIPMENT_STATUS_META[row.original.status];
      const Icon = meta.icon;

      return (
        <Badge variant={meta.variant} className="gap-1">
          <Icon size={14} className="opacity-70" />
          {meta.label}
        </Badge>
      );
    },
  },
];
