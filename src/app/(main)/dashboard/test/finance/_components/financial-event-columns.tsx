import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/shared/ui/atoms/badge";

import { FIN_EVENT_META, FinancialEvent } from "./financial-event";

export const FinancialEventsColumns: ColumnDef<FinancialEvent>[] = [
  {
    accessorKey: "createdAt",
    header: "Дата",
  },
  {
    accessorKey: "type",
    header: "Тип",
    cell: ({ row }) => {
      const meta = FIN_EVENT_META[row.original.type];
      const Icon = meta.icon;

      return (
        <Badge variant={meta.variant} className="gap-1">
          <Icon size={14} className="opacity-70" />
          {meta.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amountUsd",
    header: "Сумма",
    meta: { align: "right" },
    cell: ({ row }) => {
      const { amountUsd, direction } = row.original;
      const color = direction === "INCOME" ? "text-green-600" : "text-red-600";

      return <span className={color}>{amountUsd.toFixed(2)} $</span>;
    },
  },
  {
    accessorKey: "comment",
    header: "Комментарий",
    cell: ({ row }) => row.original.comment ?? "—",
  },
  {
    accessorKey: "createdBy",
    header: "Кто",
  },
];
