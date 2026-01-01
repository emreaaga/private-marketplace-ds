import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

import { type Order } from "./orders.type";
import { StatusStepper } from "./status-stepper";

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
    cell: ({ row }) => (
      <div className="flex flex-col leading-tight">
        <span className="font-mono text-sm">{row.original.id}</span>
        <div style={{ fontSize: 9 }} className="text-muted-foreground">
          {row.original.date}
        </div>
      </div>
    ),
  },

  {
    id: "recipient",
    header: "Получатель",
    size: 220,
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.recipient.name}</span>,
  },
  {
    id: "weight",
    header: "Вес",
    cell: ({ row }) => {
      const [int, frac] = "120.50".split(".");

      return (
        <span className="text-sm">
          {int}
          <span className="text-muted-foreground text-xs">.{frac}</span>
          <span className="text-muted-foreground ml-1 text-xs">кг</span>
        </span>
      );
    },
  },
  {
    id: "payment",
    header: "Оплата",
    cell: ({ row }) => {
      const [int, frac] = "150.50".split(".");

      return (
        <span className="text-sm">
          ${int}
          <span className="text-muted-foreground text-xs">.{frac}</span>
        </span>
      );
    },
  },
  {
    id: "status",
    header: "Статус",
    size: 120,
    minSize: 120,
    maxSize: 120,
    enableResizing: false,
    cell: ({ row }) => <StatusStepper status={row.original.status} />,
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
