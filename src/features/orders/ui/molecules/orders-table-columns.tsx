import { ColumnDef } from "@tanstack/react-table";

import { StatusStepper } from "@/app/(main)/dashboard/seller/orders/_components/status-stepper";
import type { Order } from "@/features/orders/types/order.types";
import { Badge } from "@/shared/ui/atoms/badge";

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
    id: "status2",
    header: "Статусы",
    size: 120,
    minSize: 120,
    maxSize: 120,
    enableResizing: false,
    cell: ({ row }) => (
      <StatusStepper
        status={row.original.status2}
        dates={{
          created: "12.09.2025 · 14:32",
        }}
      />
    ),
  },

  {
    accessorKey: "total",
    header: "Сумма",
    cell: ({ row }) => <span>${row.original.total}</span>,
  },
  // {
  //   accessorKey: "status",
  //   header: "Статус",
  //   cell: ({ row }) => <StatusBadge status={row.original.status} />,
  // },
];
