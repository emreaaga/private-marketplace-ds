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
    id: "counter",
    header: "№",
    cell: ({ row }) => row.original.counter,
  },

  {
    id: "id_date",
    header: "ID / Дата",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-mono text-xs">{row.original.id}</span>
        <span className="text-muted-foreground text-xs">{row.original.date}</span>
      </div>
    ),
  },
  {
    id: "persons",
    header: "Отпр/Плчт",
    cell: ({ row }) => (
      <div className="flex flex-col text-sm leading-snug">
        <span className="font-medium">{row.original.sender.name}</span>
        <span className="text-muted-foreground">→ {row.original.recipient.name}</span>
      </div>
    ),
  },

  {
    id: "phones",
    header: "Телефоны",
    cell: ({ row }) => (
      <div className="flex flex-col text-xs leading-snug">
        <span>
          <span className="text-muted-foreground">Отпр.:</span> {row.original.sender.phone}
        </span>
        <span>
          <span className="text-muted-foreground">Получ.:</span> {row.original.recipient.phone}
        </span>
      </div>
    ),
  },

  // {
  //   id: "sender",
  //   header: "Отправитель",
  //   cell: ({ row }) => (
  //     <div className="flex flex-col">
  //       <span className="font-medium">{row.original.sender.name}</span>
  //       <span className="text-muted-foreground text-xs">{row.original.sender.phone}</span>
  //     </div>
  //   ),
  // },

  // {
  //   id: "recipient",
  //   header: "Получатель",
  //   cell: ({ row }) => (
  //     <div className="flex flex-col">
  //       <span className="font-medium">{row.original.recipient.name}</span>
  //       <span className="text-muted-foreground text-xs">{row.original.recipient.phone}</span>
  //     </div>
  //   ),
  // },

  {
    id: "route",
    header: "Маршрут",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.sender.city}</span>
        <span className="text-muted-foreground text-xs"> {row.original.recipient.city}</span>
      </div>
    ),
  },

  {
    id: "weight_rate",
    header: "Вес / Ставка",
    cell: ({ row }) => (
      <div className="flex flex-col text-xs">
        <span>{row.original.weight} кг</span>
        <span className="text-muted-foreground">{row.original.ratePerKg} $ / кг</span>
      </div>
    ),
  },

  {
    id: "extras",
    header: "Доп. оплата",
    cell: ({ row }) => {
      const sum = row.original.extraCharges?.reduce((acc, c) => acc + c.amount, 0) ?? 0;

      return sum ? `${sum.toLocaleString()} $` : "—";
    },
  },

  {
    id: "payments",
    header: "Оплата",
    cell: ({ row }) => {
      const p1 = row.original.payment1;
      const p2 = row.original.payment2;

      const formatLocation = (loc: "turkey" | "destination") => (loc === "turkey" ? "Турция" : "При получении");

      return (
        <div className="flex flex-col text-xs leading-snug">
          <span>
            <span className="text-muted-foreground">{formatLocation(p1.location)}:</span>{" "}
            <span className="font-medium">{p1.amount.toLocaleString()} $</span>
          </span>

          {p2 && (
            <span>
              <span className="text-muted-foreground">{formatLocation(p2.location)}:</span>{" "}
              <span className="font-medium">{p2.amount.toLocaleString()} $</span>
            </span>
          )}
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
