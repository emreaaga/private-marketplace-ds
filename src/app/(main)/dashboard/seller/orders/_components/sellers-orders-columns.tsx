import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

import { type Order } from "./orders.type";

/* =========================
   TABLE TOKENS
========================= */

const TABLE_BADGE_CLASS = "h-5 px-1.5 rounded-[4px] text-[10px] leading-none font-medium whitespace-nowrap";

/* =========================
   HELPERS
========================= */

const TableBadge = ({ children, tooltip }: { children: React.ReactNode; tooltip?: string }) => {
  const badge = <Badge className={TABLE_BADGE_CLASS}>{children}</Badge>;

  if (!tooltip) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent side="top">
        <span className="text-[10px]">{tooltip}</span>
      </TooltipContent>
    </Tooltip>
  );
};

/* =========================
   COLUMNS
========================= */

export const getSellersOrdersColumns = (): ColumnDef<Order>[] => [
  {
    id: "order",
    header: "Заказ",
    size: 120,
    cell: ({ row }) => <span className="font-mono text-[11px] whitespace-nowrap">{row.original.id}-001</span>,
  },

  {
    accessorKey: "col1",
    header: "1",
    cell: () => <TableBadge tooltip="12.09.2025 · 14:32">Client-1</TableBadge>,
  },

  {
    accessorKey: "col2",
    header: "2",
    cell: () => <TableBadge>Курьер</TableBadge>,
  },

  {
    accessorKey: "col3",
    header: "3",
    cell: () => <TableBadge>IST-A01</TableBadge>,
  },

  {
    accessorKey: "col4",
    header: "4",
    cell: () => <TableBadge>IST-таможня</TableBadge>,
  },

  {
    accessorKey: "col5",
    header: "5",
    cell: () => <TableBadge>TR–UZ</TableBadge>,
  },

  {
    accessorKey: "col6",
    header: "6",
    cell: () => <TableBadge>TAS-таможня</TableBadge>,
  },

  {
    accessorKey: "col7",
    header: "7",
    cell: () => <TableBadge>TAS-A02</TableBadge>,
  },

  {
    accessorKey: "col8",
    header: "8",
    cell: () => <TableBadge>Курьер</TableBadge>,
  },

  {
    accessorKey: "col9",
    header: "9",
    cell: () => <TableBadge>SKD-client</TableBadge>,
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
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-6 w-6">
        <Eye className="h-3.5 w-3.5" />
      </Button>
    ),
  },
];
