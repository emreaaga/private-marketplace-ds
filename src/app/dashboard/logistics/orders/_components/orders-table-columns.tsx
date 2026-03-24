import { ColumnDef } from "@tanstack/react-table";

import { StatusStepper } from "@/app/dashboard/logistics/orders/_components/status-stepper";

import type { Order } from "./order.types";

export const getOrderColumns = (): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "ID",
    size: 80,
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },

  {
    id: "status",
    header: "Статусы",
    enableResizing: false,
    cell: () => (
      <div className="flex items-center gap-2">
        <StatusStepper
          status="post_a_1"
          dates={{
            post_a_1: "12.09.2025 · 14:32",
            tas2: "13.09.2025 · 10:20",
            client_2: "15.09.2025 · 18:45",
          }}
        />

        <div className="flex h-5 items-center gap-2 rounded-sm border px-2 text-[11px]">
          <span className="text-[10px] font-medium">
            12<span className="text-[8px]">.00</span>
            <span className="text-muted-foreground ml-0.5 text-[8px]">кг</span>
          </span>
          <span className="text-[10px] font-medium">
            6<span className="text-[8px]">.00</span>
            <span className="text-muted-foreground ml-0.5 text-[8px]">$/кг</span>
          </span>
          <span className="text-[10px] font-medium">
            15<span className="text-[8px]">.00</span>
            <span className="text-muted-foreground ml-0.5 text-[8px]">$</span>
          </span>
          <span className="text-[10px] font-medium">
            12<span className="text-[8px]">.00</span>
            <span className="text-muted-foreground ml-0.5 text-[8px]">$</span>
          </span>
          <span className="text-[10px] font-medium">
            4<span className="text-[8px]">.00</span>
            <span className="text-muted-foreground ml-0.5 text-[8px]">$</span>
          </span>
        </div>
      </div>
    ),
  },
];
