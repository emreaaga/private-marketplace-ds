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
    accessorKey: "date",
    header: "Дата",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
  },
  {
    accessorKey: "id",
    header: "id",
    cell: ({ getValue }) => <span className="text-muted-foreground font-mono text-xs">{getValue<string>()}</span>,
  },

  {
    accessorKey: "sender",
    header: "Отправитель",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1.5">
        <ArrowUp className="text-muted-foreground h-3.5 w-3.5" />
        <span>{getValue<string>()}</span>
      </div>
    ),
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
    accessorKey: "receiver",
    header: "Получатель",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1.5">
        <ArrowDown className="text-muted-foreground h-3.5 w-3.5" />
        <span>{getValue<string>()}</span>
      </div>
    ),
  },
];
