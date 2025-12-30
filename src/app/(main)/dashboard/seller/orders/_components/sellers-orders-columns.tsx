import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

import { type Order, STATUS_MAP } from "./orders.type";

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
    size: 140,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}</span>,
  },
  {
    id: "recipient",
    header: "Получатель",
    size: 220,
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.recipient.name}</span>,
  },
  {
    id: "city",
    header: "Город",
    size: 140,
    cell: ({ row }) => <span className="mx-1">{row.original.recipient.city}</span>,
  },
  {
    id: "payment",
    header: "Оплата",
    cell: ({ row }) => {
      return <span className="text-sm">$150.50</span>;
    },
  },
  {
    id: "weight",
    header: "Вес",
    cell: ({ row }) => {
      return <span className="text-sm">кг 120.50</span>;
    },
  },
  {
    id: "date",
    header: "Дата",
    cell: ({ row }) => {
      return <span className="text-muted-foreground">{row.original.date}</span>;
    },
  },
  {
    id: "status",
    header: "Статус",
    size: 120,
    cell: ({ row }) => {
      const cfg = STATUS_MAP[row.original.status];
      const Icon = cfg.icon;
      return (
        <div
          className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium ${cfg.className}`}
        >
          <Icon className="h-3.5 w-3.5 opacity-80" />
          {cfg.label}
        </div>
      );
    },
  },
  {
    id: "expand",
    header: "",
    size: 32,
    enableSorting: false,
    cell: ({ row }) => (
      <button
        onClick={row.getToggleExpandedHandler()}
        className="text-muted-foreground hover:text-foreground text-lg leading-none"
      >
        {row.getIsExpanded() ? "−" : "+"}
      </button>
    ),
  },
  {
    id: "actions",
    header: "",
    size: 40,
    enableSorting: false,
    cell: () => (
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-7 w-7">
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];
