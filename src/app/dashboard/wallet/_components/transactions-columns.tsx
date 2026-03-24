"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, Coins } from "lucide-react";

export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  type: "in" | "out";
  amount: number;
  date: string;
}

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ getValue }) => <span className="text-muted-foreground font-mono text-xs">{getValue<string>()}</span>,
  },
  {
    accessorKey: "amount",
    header: "Сумма",
    cell: ({ row, getValue }) => {
      const value = getValue<number>();

      return (
        <div className="text-foreground flex items-center gap-1.5 font-medium tabular-nums">
          <Coins className="h-3.5 w-3.5 text-yellow-500" />
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "sender",
    header: "Отправитель",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1.5">
        <ArrowUp className="h-3.5 w-3.5 text-red-600" />
        <span>{getValue<string>()}</span>
      </div>
    ),
  },
  {
    accessorKey: "receiver",
    header: "Получатель",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1.5">
        <ArrowDown className="h-3.5 w-3.5 text-green-600" />
        <span>{getValue<string>()}</span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Дата",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
  },
];
