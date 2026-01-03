import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

import { type Order } from "./orders.type";

export const getSellersOrdersColumns = (): ColumnDef<Order>[] => [
  {
    id: "order",
    header: "Заказ",
    size: 140,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}-001</span>,
  },
  {
    accessorKey: "col1",
    header: "Кол1",
    cell: () => (
      <div className="flex flex-col gap-0.5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="table" className="cursor-default rounded-sm text-xs">
                B100
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="top">
              <span className="text-[11px]">12.09.2025 · 14:32</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <span className="text-muted-foreground text-[10px]">IST-$15.</span>
      </div>
    ),
  },
  {
    accessorKey: "col2",
    header: "Кол2",
    cell: () => (
      <div className="flex flex-col gap-0.5">
        <Badge variant="table" className="rounded-sm text-xs">
          S001
        </Badge>
        <span className="text-muted-foreground text-[10px]">В пути</span>
      </div>
    ),
  },
  {
    accessorKey: "col3",
    header: "Кол3",
    cell: () => (
      <div className="flex flex-col gap-0.5">
        <Badge variant="table" className="rounded-sm text-xs">
          Таможня
        </Badge>
        <span className="text-muted-foreground text-[10px]">UZ</span>
      </div>
    ),
  },
  {
    accessorKey: "col4",
    header: "Кол4",
    cell: () => (
      <div className="flex flex-col gap-0.5">
        <Badge variant="secondary" className="rounded-sm text-xs">
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
        <Badge variant="secondary" className="rounded-sm text-xs">
          A01K001
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
        <Badge variant="secondary" className="rounded-sm text-xs">
          {row.original.recipient.name}
        </Badge>
        <span className="text-muted-foreground text-[10px]">SKD-$20.00</span>
      </div>
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
