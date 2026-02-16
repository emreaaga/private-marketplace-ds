import { ColumnDef } from "@tanstack/react-table";

import { Order } from "@/shared/types/order/order-map.api";
import { ORDER_STATUS_META } from "@/shared/types/order/order.status.meta";
import { Badge } from "@/shared/ui/atoms/badge";

import { formatMoney, formatWeight } from "../../_components/finance";

const formatDateTime = (d: Date) =>
  new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

export const OrdersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Заказ",
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}</span>,
  },
  {
    accessorKey: "clientName",
    header: "Клиент",
  },
  {
    accessorKey: "weightKg",
    header: "Вес",
    meta: { align: "right" },
    cell: ({ row }) => formatWeight(row.original.weightKg),
  },
  {
    accessorKey: "tariffPerKgUsd",
    header: "Ставка",
    meta: { align: "right" },
    cell: ({ row }) => formatMoney(row.original.tariffPerKgUsd),
  },
  {
    accessorKey: "incomeUsd",
    header: "Стоимость",
    meta: { align: "right" },
    cell: ({ row }) => formatMoney(row.original.incomeUsd),
  },
  {
    accessorKey: "paidUsd",
    header: "Оплачено",
    meta: { align: "right" },
    cell: ({ row }) => formatMoney(row.original.paidUsd),
  },
  {
    accessorKey: "remainingUsd",
    header: "Остаток",
    meta: { align: "right" },
    cell: ({ row }) => (
      <span className={row.original.remainingUsd > 0 ? "text-red-600" : "text-green-600"}>
        {formatMoney(row.original.remainingUsd)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const meta = ORDER_STATUS_META[row.original.status];
      const Icon = meta.icon;

      return (
        <Badge variant={meta.variant} className="gap-1">
          <Icon size={14} className="opacity-70" />
          {meta.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата",
    meta: { align: "right" },
    cell: ({ row }) => <span className="whitespace-nowrap">{formatDateTime(row.original.createdAt)}</span>,
  },
];
