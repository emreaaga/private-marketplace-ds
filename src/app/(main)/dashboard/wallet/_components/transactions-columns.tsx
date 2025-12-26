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
  {
    id: "T10003",
    sender: "client3",
    receiver: "client2",
    type: "in",
    amount: 50,
    date: "14.09.2025",
  },
  {
    id: "T10004",
    sender: "client2",
    receiver: "service_fee",
    type: "out",
    amount: 15,
    date: "14.09.2025",
  },
  {
    id: "T10005",
    sender: "marketplace",
    receiver: "client2",
    type: "in",
    amount: 1280,
    date: "15.09.2025",
  },
  {
    id: "T10006",
    sender: "client2",
    receiver: "client5",
    type: "out",
    amount: 420,
    date: "16.09.2025",
  },
  {
    id: "T10007",
    sender: "refund_service",
    receiver: "client2",
    type: "in",
    amount: 89,
    date: "16.09.2025",
  },
  {
    id: "T10008",
    sender: "client2",
    receiver: "subscription",
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
        <ArrowUp className="h-3.5 w-3.5 text-green-600" />
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
        <ArrowDown className="h-3.5 w-3.5 text-red-600" />
        <span>{getValue<string>()}</span>
      </div>
    ),
  },
];
