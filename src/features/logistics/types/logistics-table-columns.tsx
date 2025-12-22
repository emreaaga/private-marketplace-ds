import { ColumnDef } from "@tanstack/react-table";
import { Eye, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

import type { Order } from "./order.types";

const STATUS_MAP: Record<
  Order["status"],
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  created: {
    label: "Создан",
    className: "bg-slate-500/10 text-slate-700",
    icon: Clock,
  },
  in_transit: {
    label: "В пути",
    className: "bg-blue-500/10 text-blue-700",
    icon: Truck,
  },
  delivered: {
    label: "Доставлен",
    className: "bg-green-500/10 text-green-700",
    icon: CheckCircle2,
  },
  canceled: {
    label: "Отменён",
    className: "bg-red-500/10 text-red-700",
    icon: XCircle,
  },
};

export const getLogisticsColumns = (): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },

  {
    id: "recipient",
    header: "Получатель",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.recipient.name}</span>
        <span className="text-muted-foreground text-xs">{row.original.recipient.city}</span>
      </div>
    ),
  },

  {
    id: "route",
    header: "Маршрут",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.sender.city} → {row.original.recipient.city}
      </span>
    ),
  },

  {
    accessorKey: "weight",
    header: "Вес",
    cell: ({ row }) => `${row.original.weight} кг`,
  },

  {
    id: "payment",
    header: "Оплата",
    cell: ({ row }) => {
      const { type, amount } = row.original.payment;

      return (
        <div className="flex flex-col text-xs">
          <span>{type === "prepaid" ? "Оплачено" : "Наложенный платёж"}</span>
          <span className="text-muted-foreground">{amount.toLocaleString()} $</span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const cfg = STATUS_MAP[row.original.status];
      const Icon = cfg.icon;

      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${cfg.className}`}>
          <Icon className="h-3.5 w-3.5" />
          {cfg.label}
        </span>
      );
    },
  },

  {
    accessorKey: "date",
    header: "Дата",
  },

  {
    id: "actions",
    header: "",
    size: 44,
    cell: () => (
      <Button variant="ghost" size="icon" className="h-6 w-6">
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];
