import { ColumnDef } from "@tanstack/react-table";
import { Coins } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export interface Transaction {
  id: string;
  sender: string;
  receiver: string;
  type: "in" | "out";
  amount: number;
  date: string;
}

export const data: Transaction[] = [
  {
    id: "T10001",
    sender: "client1",
    receiver: "client2",
    type: "in",
    amount: 100,
    date: "12.09.2025",
  },
  {
    id: "T10002",
    sender: "prodavec1",
    receiver: "client2",
    type: "out",
    amount: 350,
    date: "13.09.2025",
  },
];

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "id",
    cell: ({ getValue }) => <span className="text-muted-foreground font-mono text-xs">{getValue<string>()}</span>,
  },
  {
    accessorKey: "sender",
    header: "Отправитель",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "receiver",
    header: "Получатель",
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "type",
    header: "Тип",
    cell: ({ getValue }) => {
      const type = getValue<"in" | "out">();
      return (
        <div className="flex items-center gap-1.5">
          <span>{type === "in" ? "Поступление" : "Списание"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Сумма",
    cell: ({ row, getValue }) => {
      const value = getValue<number>();
      const isIn = row.original.type === "in";

      return (
        <div
          className={cn(
            "flex items-center gap-1.5 font-medium tabular-nums",
            isIn ? "text-emerald-600" : "text-rose-600",
          )}
        >
          <Coins className="h-3.5 w-3.5 opacity-70" />
          <span>{value}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "date",
    header: "Дата",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
  },
];
