import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
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
          25.70-150.30-6.50-5.00-120.00-20.00
        </div>
      </div>
    ),
  },
  // {
  //   id: "weight",
  //   header: "Вес",
  //   cell: ({ row }) => {
  //     const [int, frac] = "120.50".split(".");

  //     return (
  //       <span className="text-sm">
  //         {int}
  //         <span className="text-muted-foreground text-xs">.{frac}</span>
  //         <span className="text-muted-foreground ml-1 text-xs">кг</span>
  //       </span>
  //     );
  //   },
  // },
  // {
  //   id: "payment",
  //   header: "Оплата",
  //   cell: ({ row }) => {
  //     const [int, frac] = "150.50".split(".");

  //     return (
  //       <span className="text-sm">
  //         ${int}
  //         <span className="text-muted-foreground text-xs">.{frac}</span>
  //       </span>
  //     );
  //   },
  // },
  {
    accessorKey: "col1",
    header: "Кол1",
    cell: () => (
      <div className="flex flex-col gap-0.5">
        <Badge className="text-xs">test1</Badge>
        <span className="text-muted-foreground text-[10px]">IST</span>
      </div>
    ),
  },
  {
    accessorKey: "col2",
    header: "Кол2",
    cell: () => (
      <div className="flex flex-col gap-0.5">
        <Badge className="text-xs">S001</Badge>
        <span className="text-muted-foreground text-[10px]">В пути</span>
      </div>
    ),
  },
  {
    accessorKey: "col3",
    header: "Кол3",
    cell: () => (
      <div className="flex flex-col gap-0.5">
        <Badge className="text-xs">test3</Badge>
        <span className="text-muted-foreground text-[10px]">Таможня</span>
      </div>
    ),
  },
  {
    accessorKey: "col4",
    header: "Кол4",
    cell: () => (
      <div className="flex flex-col gap-0.5">
        <Badge variant="secondary" className="text-xs">
          A03
        </Badge>
        <span className="text-muted-foreground text-[10px]">TAS-12.00kg</span>
      </div>
    ),
  },
  {
    accessorKey: "col5",
    header: "Кол5",
    cell: () => (
      <div className="flex flex-col gap-0.5">
        <Badge variant="secondary" className="text-xs">
          test5
        </Badge>
        <span className="text-muted-foreground text-[10px]">У курьера</span>
      </div>
    ),
  },
  {
    accessorKey: "col6",
    header: "Кол6",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <Badge variant="secondary" className="text-xs">
          {row.original.recipient.name}
        </Badge>
        <span className="text-muted-foreground text-[10px]">SKD-$20.00</span>
      </div>
    ),
  },
  {
    id: "status",
    header: "Статус",
    size: 120,
    minSize: 120,
    maxSize: 120,
    enableResizing: false,
    cell: ({ row }) => (
      <StatusStepper
        status={row.original.status}
        dates={{
          created: "12.09.2025 · 14:32",
        }}
      />
    ),
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
