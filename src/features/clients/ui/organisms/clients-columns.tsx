"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { UserStatus, Client } from "@/features/clients/types/client.types";
import { Badge } from "@/shared/ui/atoms/badge";

export const clientsColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "public_id",
    header: "ID",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-xs">{row.original.public_id}</span>,
  },
  {
    accessorKey: "name",
    header: "Клиент",
  },
  {
    accessorKey: "city",
    header: "Город",
  },
  {
    accessorKey: "orders_count",
    header: "Заказы",
    cell: ({ row }) => <span className="font-medium">{row.original.orders_count}</span>,
  },
  {
    accessorKey: "total_spent",
    header: "Оборот",
    cell: ({ row }) => <span className="font-medium">{row.original.total_spent.toLocaleString("ru-RU")} $</span>,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const STATUS_MAP: Record<UserStatus, { label: string; className: string }> = {
        active: { label: "Акт.", className: "bg-green-500/15 text-green-700" },
        pending: { label: "Ожд.", className: "bg-yellow-500/15 text-yellow-700" },
        blocked: { label: "Заб.", className: "bg-red-500/15 text-red-700" },
      };

      const status = row.original.status;

      return (
        <Badge variant="outline" className={STATUS_MAP[status].className}>
          {STATUS_MAP[status].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Создан",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString("ru-RU"),
  },
];
