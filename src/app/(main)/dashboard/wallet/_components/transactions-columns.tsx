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
    sender: "C1001",
    receiver: "C1002",
    type: "in",
    amount: 100,
    date: "12.09.2025",
  },
  {
    id: "T10002",
    sender: "B100",
    receiver: "C1001",
    type: "out",
    amount: 350,
    date: "13.09.2025",
  },
  {
    id: "T10003",
    sender: "C1003",
    receiver: "C1001",
    type: "in",
    amount: 121,
    date: "14.09.2025",
  },
  {
    id: "T10004",
    sender: "B101",
    receiver: "B1003",
    type: "out",
    amount: 155,
    date: "14.09.2025",
  },
  {
    id: "T10005",
    sender: "C1012",
    receiver: "C1112",
    type: "in",
    amount: 375,
    date: "15.09.2025",
  },
  {
    id: "T10006",
    sender: "B112",
    receiver: "B185",
    type: "out",
    amount: 420,
    date: "16.09.2025",
  },
  {
    id: "T10007",
    sender: "C1111",
    receiver: "C7777",
    type: "in",
    amount: 777,
    date: "16.09.2025",
  },
  {
    id: "T10008",
    sender: "B123",
    receiver: "B321",
    type: "out",
    amount: 199,
    date: "17.09.2025",
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
        <ArrowUp className="h-3.5 w-3.5 text-red-600" />
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
        <ArrowDown className="h-3.5 w-3.5 text-green-600" />
        <span>{getValue<string>()}</span>
      </div>
    ),
  },
];
