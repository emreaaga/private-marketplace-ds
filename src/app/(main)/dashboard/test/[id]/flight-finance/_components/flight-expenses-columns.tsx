"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { FlightExpenses } from "@/shared/types/flight-expenses";
import { EXPENSE_TYPE_CONFIG } from "@/shared/types/flight-expenses/flight-expenses.status.meta";
import { Button } from "@/shared/ui/atoms/button";

export const flightExpensesColumns: ColumnDef<FlightExpenses>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-muted-foreground text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "type",
    header: "Тип расхода",
    cell: ({ row }) => {
      const type = row.original.type;
      const config = EXPENSE_TYPE_CONFIG[type] ?? EXPENSE_TYPE_CONFIG.other;
      const { Icon, label } = config;

      return (
        <div className="flex items-center gap-2">
          <Icon className="text-muted-foreground/70 h-4 w-4" />
          <span className="text-sm font-medium">{label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Описание",
    cell: ({ row }) => (
      <span className="text-muted-foreground block max-w-75 truncate text-sm">{row.original.description || "—"}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Сумма",
    cell: ({ row }) => {
      const amount = parseFloat(row.original.amount);
      return <span className="font-mono font-medium text-red-600 tabular-nums">-${amount.toFixed(2)}</span>;
    },
  },
  {
    id: "actions",
    header: "",
    meta: { align: "right" },
    cell: () => (
      <div className="flex justify-end">
        <Button variant="ghost" className="text-muted-foreground h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
