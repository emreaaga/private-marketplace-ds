"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Eye } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { StatusProgress } from "@/shared/ui/atoms/status-progress";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

import { type GetTripsRes } from "../api/types/get-trips.res";
import { TRIP_STATUS_META } from "../model/trip.status.meta";

export const getTripsColumns = (onView: (id: number) => void, onPrefetch: () => void): ColumnDef<GetTripsRes>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "total_city",
    header: "Маршрут",
    cell: ({ getValue }) => formatQuantity(getValue<number>(), { unit: "грд" }),
  },
  {
    accessorKey: "total_orders",
    header: "Заказы",
    cell: ({ getValue }) => formatQuantity(getValue<number>(), { unit: "шт" }),
  },
  {
    accessorKey: "total_weight",
    header: "Вес",
    cell: ({ getValue }) => {
      const val = getValue<string | number>();
      return val ? formatWeight(val.toString()) : "—";
    },
  },
  {
    accessorKey: "total_remaining",
    header: "Остаток",
    cell: ({ getValue }) => formatMoney(getValue<string>()),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.original.status;
      const { Icon, step, label } = TRIP_STATUS_META[status];
      return <StatusProgress step={step} totalSteps={3} Icon={Icon} label={label} />;
    },
  },
  {
    id: "actions",
    header: "",
    meta: { align: "right" },
    cell: ({ row }) => {
      const tripId = row.original.id;

      const { total_orders, total_city, total_weight, total_remaining } = row.original;

      return (
        <div className="flex items-center justify-end gap-0.5">
          <Button
            variant="ghost"
            className="hover:bg-muted/50 h-6 w-6 p-0"
            title="Просмотр"
            onClick={() => onView(tripId)}
            onMouseEnter={onPrefetch}
          >
            <Eye className="text-muted-foreground/70 h-3 w-3" />
          </Button>

          <Button asChild variant="ghost" className="hover:bg-muted/50 h-6 w-6 p-0" onMouseEnter={onPrefetch}>
            <Link
              href={{
                pathname: `/dashboard/test/${tripId}/trips`,
                query: {
                  orders: total_orders,
                  cities: total_city,
                  weight: Number(total_weight).toFixed(2),
                  remaining: Number(total_remaining).toFixed(2),
                },
              }}
              title="Открыть заказы"
            >
              <ChevronRight className="text-muted-foreground/70 h-3 w-3" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
