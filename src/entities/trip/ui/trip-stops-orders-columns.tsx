"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { ORDER_STATUS_META } from "@/entities/order";
import { Button } from "@/shared/ui/atoms/button";
import { StatusProgress } from "@/shared/ui/atoms/status-progress";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

import { type TripStopOrder } from "../api/get-trip-stop-orders.api";

export const getTripStopOrdersColumns = (
  onView: (id: number) => void,
  onHover: () => void,
): ColumnDef<TripStopOrder>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => <span className="text-muted-foreground font-mono text-[11px]">#{getValue<number>()}</span>,
  },
  {
    accessorKey: "receiver_name",
    header: "Получатель",
    cell: ({ getValue }) => <span className="text-[13px] font-medium">{getValue<string>()}</span>,
  },
  {
    accessorKey: "weight_kg",
    header: "Вес",
    meta: { align: "right" },
    cell: ({ getValue }) => (
      <span className="text-muted-foreground text-[13px]">{formatWeight(getValue<string>())}</span>
    ),
  },
  {
    accessorKey: "remaining",
    header: "Остаток",
    meta: { align: "right" },
    cell: ({ getValue }) => (
      <span className="text-[13px] font-semibold text-red-600">{formatMoney(getValue<string>())}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const data = row.original;
      if (!data) return null;

      const statusMeta = ORDER_STATUS_META[data.status];
      if (!statusMeta) return data.status;

      return (
        <div className="ml-1 flex items-center justify-start">
          <StatusProgress step={statusMeta.step} totalSteps={5} Icon={statusMeta.icon} label={statusMeta.label} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    meta: { align: "right" },
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <Button
          variant="ghost"
          className="hover:bg-muted/50 h-6 w-6 p-0"
          onClick={() => onView(row.original.id)}
          onMouseEnter={onHover}
          title="Просмотр заказа"
        >
          <Eye className="text-muted-foreground/70 h-3.5 w-3.5" />
        </Button>
      </div>
    ),
  },
];
