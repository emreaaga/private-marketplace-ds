"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, ChevronRight } from "lucide-react";

import type { Flight } from "@/shared/types/flight/flight.model";
import { FLIGHT_STATUS_META } from "@/shared/types/flight/flight.status.meta";
import { Button } from "@/shared/ui/atoms/button";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

export const createFlightsColumns = (onEdit: (id: number) => void): ColumnDef<Flight>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "route",
    header: "Маршрут",
  },
  {
    accessorKey: "air_kg_price",
    header: "Ставка",
    cell: ({ row }) => {
      const price = row.original.air_kg_price;
      return price ? (
        <span className="text-muted-foreground font-medium tabular-nums">${Number(price).toFixed(2)}</span>
      ) : (
        "—"
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.original.status;
      const { Icon, step, label } = FLIGHT_STATUS_META[status];
      const percentage = (step / 4) * 100;
      const circumference = 56.5;

      return (
        <div className="relative flex h-6 w-6 items-center justify-center" title={label}>
          <svg className="absolute h-full w-full -rotate-90">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="transparent"
              className="text-muted/20"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * percentage) / 100}
              strokeLinecap="round"
              className="text-muted-foreground/60 transition-all duration-500"
            />
          </svg>
          <Icon className="text-muted-foreground/80 relative z-10 h-3 w-3" />
        </div>
      );
    },
  },
  {
    accessorKey: "final_gross_weight_kg",
    header: "Вес",
    cell: ({ row }) => {
      const value = row.original.final_gross_weight_kg;
      return value === null ? formatWeight(0, "warning") : formatWeight(value);
    },
  },
  {
    accessorKey: "arrival_at",
    header: "Прибытие",
    cell: ({ row }) => {
      const value = row.original.arrival_at;
      return <span className="text-muted-foreground text-sm">{new Date(value).toLocaleDateString("ru-RU")}</span>;
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <Button variant="ghost" className="h-7 w-7 p-0" onClick={() => onEdit(row.original.id)}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button asChild variant="ghost" className="h-7 w-7 p-0">
          <Link href={`/dashboard/test/${row.original.id}/shipments`}>
            <ChevronRight className="text-muted-foreground h-4 w-4" />
          </Link>
        </Button>
      </div>
    ),
  },
];
