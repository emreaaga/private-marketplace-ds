"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Eye } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { StatusProgress } from "@/shared/ui/atoms/status-progress";
import { formatMoney } from "@/shared/ui/molecules/format-money"; // Используем для денег
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

import { TRIP_STATUS_META } from "../model/trip.status.meta";

export type TripMock = {
  id: number;
  vehicle_info: string;
  driver_info: string;
  cities_count: number;
  orders_count: number;
  total_weight: string;
  total_remaining: string;
  status: "created" | "on_way" | "completed";
  created_at: string;
};

export const getTripsColumns = (onView: (id: number) => void): ColumnDef<TripMock>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "vehicle_info",
    header: "Транспорт",
    cell: ({ getValue }) => <div className="text-sm font-medium">{getValue<string>()}</div>,
  },
  {
    accessorKey: "driver_info",
    header: "Водитель",
    cell: ({ getValue }) => <div className="text-sm">{getValue<string>()}</div>,
  },
  {
    accessorKey: "cities_count",
    header: "Маршрут",
    cell: ({ getValue }) => formatQuantity(getValue<string | number>(), { unit: "грд" }),
  },
  {
    accessorKey: "orders_count",
    header: "Заказы",
    cell: ({ getValue }) => formatQuantity(getValue<string | number>(), { unit: "шт" }),
  },
  {
    accessorKey: "total_weight",
    header: "Вес",
    cell: ({ getValue }) => {
      const val = getValue<string>();
      return val ? formatWeight(val) : "—";
    },
  },
  {
    accessorKey: "total_remaining",
    header: "Остаток", // Сколько денег соберется в пути
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
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-0.5">
        <Button
          variant="ghost"
          className="hover:bg-muted/50 h-6 w-6 p-0"
          title="Просмотр"
          onClick={() => onView(row.original.id)}
        >
          <Eye className="text-muted-foreground/70 h-3 w-3" />
        </Button>

        <Button asChild variant="ghost" className="hover:bg-muted/50 h-6 w-6 p-0">
          <Link href={`/dashboard/test/trips/${row.original.id}`} title="Открыть заказы">
            <ChevronRight className="text-muted-foreground/70 h-3 w-3" />
          </Link>
        </Button>
      </div>
    ),
  },
];
