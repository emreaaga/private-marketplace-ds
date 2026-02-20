import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Order } from "@/shared/types/order/order-map.api";
import { ORDER_STATUS_META } from "@/shared/types/order/order.status.meta";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";

import { formatMoney, formatWeight } from "../../_components/finance";

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
    cell: ({ row }) => {
      const value = row.original.createdAt;
      return <span className="text-muted-foreground text-sm">{new Date(value).toLocaleDateString("ru-RU")}</span>;
    },
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <Button variant="ghost" className="h-5 w-5">
        <Eye className="h-5 w-5" />
      </Button>
    ),
  },
];
