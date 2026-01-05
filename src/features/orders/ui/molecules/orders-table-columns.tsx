import { ColumnDef } from "@tanstack/react-table";

import { StatusStepper } from "@/app/(main)/dashboard/seller/orders/_components/status-stepper";
import type { Order } from "@/features/orders/types/order.types";

export const getOrderColumns = (handlers: { onOpenDetails: (order: Order) => void }): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    id: "status2",
    header: "Статусы",
    enableResizing: false,
    cell: ({ row }) => (
      <StatusStepper
        status="post_a_1"
        dates={{
          post_a_1: "12.09.2025 · 14:32",
          tas: "13.09.2025 · 10:20",
          client_2: "15.09.2025 · 18:45",
        }}
      />
    ),
  },

  {
    id: "pricing",
    header: "Расчёт",
    enableResizing: false,
    cell: ({ row }) => (
      <div className="flex h-5 items-center justify-between rounded-sm border text-[11px]">
        <span className="font-medium">12</span>
        <span className="font-medium">6</span>
        <span className="font-medium">15</span>
        <span className="font-medium">12</span>
        <span className="font-medium">4</span>
      </div>
    ),
  },

  // {
  //   accessorKey: "status",
  //   header: "Статус",
  //   cell: ({ row }) => <StatusBadge status={row.original.status} />,
  // },
];
