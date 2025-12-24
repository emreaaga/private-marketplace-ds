import { ColumnDef } from "@tanstack/react-table";
import { Eye, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

import type { Order } from "./orders.type";

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

export const getSellersOrdersColumns = (): ColumnDef<Order>[] => [
  {
    id: "sent",
    header: "Отправка",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        <span className="font-mono">{row.original.test}</span>
      </span>
    ),
  },
  {
    id: "order",
    header: "Заказ",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        <span className="font-mono">{row.original.id}</span>
      </span>
    ),
  },

  {
    id: "date",
    header: "Дата",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        <span className="text-muted-foreground">{row.original.date}</span>
      </span>
    ),
  },
  {
    id: "recipient",
    header: "Получатель",
    cell: ({ row }) => <span className="text-sm whitespace-nowrap">{row.original.recipient.name}</span>,
  },

  {
    id: "route",
    header: "Маршрут",
    cell: ({ row }) => (
      <span className="text-sm whitespace-nowrap">
        {row.original.sender.city}→{row.original.recipient.city}
      </span>
    ),
  },

  {
    id: "payment",
    header: "Оплата",
    cell: ({ row }) => {
      const paid = row.original.payment1.amount + (row.original.payment2?.amount ?? 0);

      const base = row.original.weight * row.original.ratePerKg;
      const extras = row.original.extraCharges?.reduce((a, c) => a + c.amount, 0) ?? 0;

      const total = Math.round((base + extras) * 100) / 100;
      const debt = total - paid;

      return <span className="text-sm">15.00-5.00-100.00-200.00-25.00</span>;
    },
  },

  {
    id: "status",
    header: "Статус",
    cell: ({ row }) => {
      const cfg = STATUS_MAP[row.original.status];
      const Icon = cfg.icon;

      return (
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ${cfg.className}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {cfg.label}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "",
    size: 40,
    cell: () => (
      <Button variant="ghost" size="icon" className="h-6 w-6">
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];
