import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/atoms/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

import { type Order } from "./orders.type";

const TableBadge = ({
  children,
  tooltip,
  variant = "filled",
}: {
  children: React.ReactNode;
  tooltip?: string;
  variant?: "filled" | "outline";
}) => {
  const className =
    variant === "outline"
      ? "h-5 px-1.5 text-[10px] border border-slate-300 bg-background text-slate-800 leading-none font-medium whitespace-nowrap"
      : "h-5 px-1.5 text-[10px] bg-slate-500/15 text-slate-700 leading-none font-medium whitespace-nowrap";

  const badge = <Badge className={className}>{children}</Badge>;

  if (!tooltip) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent side="top">
        <span className="text-[8px]">{tooltip}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export const getSellersOrdersColumns = (): ColumnDef<Order>[] => [
  {
    id: "order",
    header: "Заказ",
    size: 120,
    cell: ({ row }) => <span className="font-mono text-[11px] whitespace-nowrap">{row.original.id}-001</span>,
  },

  {
    accessorKey: "col1",
    header: "Отп. клиент",
    cell: () => <TableBadge tooltip="12.09.2025 · 14:32">Client-1</TableBadge>,
  },

  {
    accessorKey: "col2",
    header: "Курьер",
    cell: () => <TableBadge>Курьер</TableBadge>,
  },

  {
    accessorKey: "col3",
    header: "Пункт 1",
    cell: () => <TableBadge>IST-A01</TableBadge>,
  },

  {
    accessorKey: "col4",
    header: "Таможня",
    cell: () => <TableBadge>IST-таможня</TableBadge>,
  },

  {
    accessorKey: "col5",
    header: "Самолет",
    cell: () => <TableBadge>TR–UZ</TableBadge>,
  },

  {
    accessorKey: "col6",
    header: "Таможня",
    cell: () => <TableBadge>TAS-таможня</TableBadge>,
  },

  {
    accessorKey: "col7",
    header: "Пункт 2",
    cell: () => <TableBadge>TAS-A02</TableBadge>,
  },

  {
    accessorKey: "col8",
    header: "Курьер",
    cell: () => <TableBadge>Курьер</TableBadge>,
  },

  {
    accessorKey: "col9",
    header: "Пол. клиент",
    cell: () => <TableBadge variant="outline">SKD-client</TableBadge>,
  },

  {
    accessorKey: "col10",
    header: "Σ",
    cell: () => (
      <div className="flex items-center gap-1 rounded-md border whitespace-nowrap">
        <span className="text-[10px] font-medium">
          12<span className="text-[8px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">кг</span>
        </span>

        <span className="text-[10px] font-medium">
          6<span className="text-[8px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">$/кг</span>
        </span>

        <span className="text-[10px] font-medium">
          15<span className="text-[8px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">$</span>
        </span>

        <span className="text-[10px] font-medium">
          12<span className="text-[8px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">$</span>
        </span>

        <span className="text-[10px] font-medium">
          4<span className="text-[8px]">.00</span>
          <span className="text-muted-foreground ml-0.5 text-[8px]">$</span>
        </span>
      </div>
    ),
  },

  {
    id: "expand",
    header: "",
    size: 28,
    enableSorting: false,
    cell: ({ row }) => (
      <button
        onClick={row.getToggleExpandedHandler()}
        className="text-muted-foreground hover:text-foreground text-xs leading-none"
      >
        {row.getIsExpanded() ? "−" : "+"}
      </button>
    ),
  },

  {
    id: "actions",
    header: "",
    size: 32,
    enableSorting: false,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>Изменить</DropdownMenuItem>

          <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
