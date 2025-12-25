import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import type { Order } from "@/features/orders/types/order.types";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";

function StatusBadge({ status }: { status: Order["status"] }) {
  const map: Record<Order["status"], string> = {
    pending: "bg-yellow-500/15 text-yellow-700",
    confirmed: "bg-green-500/15 text-green-700",
    canceled: "bg-red-500/15 text-red-700",
  };

  return (
    <Badge variant="outline" className={`${map[status]}`}>
      {status === "pending" && "Ожд."}
      {status === "confirmed" && "Под."}
      {status === "canceled" && "Отм."}
    </Badge>
  );
}

export const getOrderColumns = (handlers: { onOpenDetails: (order: Order) => void }): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },

  {
    accessorKey: "customer",
    header: "Покупатель",
  },

  {
    accessorKey: "total",
    header: "Сумма",
    cell: ({ row }) => <span>${row.original.total}</span>,
  },

  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },

  {
    accessorKey: "date",
    header: "Дата",
  },

  {
    id: "actions",
    header: "",
    size: 44,
    minSize: 44,
    maxSize: 44,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handlers.onOpenDetails(row.original)}>
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
