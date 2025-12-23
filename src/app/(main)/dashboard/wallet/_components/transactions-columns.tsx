import { ColumnDef } from "@tanstack/react-table";

export interface Transaction {
  id: string;
  date: string;
  type: "in" | "out";
  amount: number;
}

export const data: Transaction[] = [
  {
    id: "T10001",
    type: "in",
    amount: 100,
    date: "12.09.2025",
  },
  {
    id: "T10002",
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
        <span className={isIn ? "tabular-nims font-medium text-emerald-600" : "font-medium text-rose-600 tabular-nums"}>
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Дата",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
  },
];
