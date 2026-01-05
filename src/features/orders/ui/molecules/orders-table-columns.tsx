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
      <div className="grid grid-cols-5 gap-0.5">
        <div className="flex h-4 items-center justify-center rounded-sm border text-[11px]">12кг</div>
        <div className="flex h-4 items-center justify-center rounded-sm border text-[11px]">6$/кг</div>
        <div className="flex h-4 items-center justify-center rounded-sm border text-[11px]">15$</div>
        <div className="flex h-4 items-center justify-center rounded-sm border text-[11px]">12$</div>
        <div className="flex h-4 items-center justify-center rounded-sm border text-[11px]">4$</div>
      </div>
    ),
  },

  // {
  //   accessorKey: "status",
  //   header: "Статус",
  //   cell: ({ row }) => <StatusBadge status={row.original.status} />,
  // },
];
