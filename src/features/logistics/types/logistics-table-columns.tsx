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
    id: "counter_date",
    header: "№ / Дата",
    cell: ({ row }) => {
      const counter = String(row.original.counter).padStart(3, "0");

      return (
        <div className="flex flex-col">
          <span className="font-medium">{counter}</span>
          <span className="text-muted-foreground text-xs">{row.original.date}</span>
        </div>
      );
    },
  },

  {
    id: "id_status",
    header: "ID / Статус",
    cell: ({ row }) => {
      const cfg = STATUS_MAP[row.original.status];
      const Icon = cfg.icon;

      return (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs">{row.original.id}</span>
          <span
            className={`inline-flex items-center gap-1.5 self-start rounded-md px-2 py-1 text-xs font-medium ${cfg.className}`}
          >
            <Icon className="h-3.5 w-3.5" />
            {cfg.label}
          </span>
        </div>
      );
    },
  },
  {
    id: "persons",
    header: "Отпр / Полч",
    cell: ({ row }) => (
      <div className="flex flex-col text-sm leading-snug">
        <span className="text-muted-foreground text-xs">{row.original.sender.name}</span>
        <span className="font-medium">{row.original.recipient.name}</span>
      </div>
    ),
  },

  {
    id: "phones",
    header: "Телефоны",
    cell: ({ row }) => (
      <div className="text-muted-foreground flex flex-col text-xs leading-snug">
        <span>{row.original.sender.phone}</span>
        <span>{row.original.recipient.phone}</span>
      </div>
    ),
  },
  {
    id: "route",
    header: "Маршрут",
    cell: ({ row }) => (
      <div className="text-muted-foreground flex flex-col text-xs">
        <span>{row.original.sender.city}</span>
        <span> {row.original.recipient.city}</span>
      </div>
    ),
  },

  {
    id: "weight_rate",
    header: "Вес / Ставка",
    cell: ({ row }) => (
      <div className="flex flex-col text-xs">
        <span className="font-medium">{row.original.weight} кг</span>
        <span className="font-medium">{row.original.ratePerKg} $/кг</span>
      </div>
    ),
  },

  {
    id: "extras",
    header: "Доп опл 1|2",
    cell: ({ row }) => {
      const sum = row.original.extraCharges?.reduce((acc, c) => acc + c.amount, 0) ?? 0;

      return (
        <div className="flex flex-col text-xs">
          <span>{sum ? `${sum.toLocaleString()} $` : "—"}</span>
          <span>5 $</span>
        </div>
      );
    },
  },

  {
    id: "payments",
    header: "Оплата 1|2",
    cell: ({ row }) => {
      const p1 = row.original.payment1;

      return (
        <div className="flex flex-col text-xs leading-snug">
          <span className="font-medium">{p1.amount.toLocaleString()} $</span>
          <span className="font-medium">{p1.amount.toLocaleString()} $</span>
        </div>
      );
    },
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
