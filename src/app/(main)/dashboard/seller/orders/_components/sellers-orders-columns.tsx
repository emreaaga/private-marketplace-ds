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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="table" className="cursor-default rounded-sm text-xs">
              Client-1
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="top">
            <span className="text-[11px]">12.09.2025 · 14:32</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "col2",
    header: "Кол2",
    cell: () => (
      <Badge variant="table" className="rounded-sm text-xs">
        Курьер
      </Badge>
    ),
  },
  {
    accessorKey: "col3",
    header: "Кол3",
    cell: () => (
      <Badge variant="table" className="rounded-sm text-xs">
        IST-A01
      </Badge>
    ),
  },
  {
    accessorKey: "col4",
    header: "Кол4",
    cell: () => (
      <Badge variant="secondary" className="rounded-sm text-xs">
        IST-Таможня
      </Badge>
    ),
  },
  {
    accessorKey: "col5",
    header: "Кол5",
    cell: () => (
      <Badge variant="secondary" className="rounded-sm text-xs">
        TR-UZ
      </Badge>
    ),
  },
  {
    accessorKey: "col6",
    header: "Кол6",
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-sm text-xs">
        TAS-Таможня
      </Badge>
    ),
  },
  {
    accessorKey: "col7",
    header: "Кол6",
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-sm text-xs">
        TAS-A02
      </Badge>
    ),
  },
  {
    accessorKey: "col8",
    header: "Кол6",
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-sm text-xs">
        Курьер
      </Badge>
    ),
  },
  {
    accessorKey: "col9",
    header: "Кол6",
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-sm text-xs">
        SKD-client2
      </Badge>
    ),
  },
  {
    accessorKey: "col10",
    header: "Кол6",
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-sm text-xs">
        12.00кг6.00$/кг15.00$12.00$4.00$
      </Badge>
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
