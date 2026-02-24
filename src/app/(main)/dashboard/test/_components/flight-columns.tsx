"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, ChevronRight, DollarSign } from "lucide-react";

import type { Flight } from "@/shared/types/flight/flight.model";
import { FLIGHT_STATUS_META } from "@/shared/types/flight/flight.status.meta";
import { Button } from "@/shared/ui/atoms/button";
import { StatusProgress } from "@/shared/ui/atoms/status-progress";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

export const createFlightsColumns = (onEdit: (id: number) => void): ColumnDef<Flight>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "route",
    header: "Маршрут",
  },
  {
    accessorKey: "air_kg_price",
    header: "Ставка",
    cell: ({ row }) => <div>{formatMoney(row.original.air_kg_price)}</div>,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.original.status;
      const { Icon, step, label } = FLIGHT_STATUS_META[status];

      return (
        <div className="ml-1 flex items-center justify-start">
          <StatusProgress step={step} totalSteps={4} Icon={Icon} label={label} />
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
    accessorKey: "prepaid_sum",
    header: "Взнос",
    cell: ({ row }) => <div>{formatMoney(row.original.prepaid_sum)}</div>,
  },
  {
    accessorKey: "remaining_sum",
    header: "Остаток",
    cell: ({ row }) => <div>{formatMoney(row.original.remaining_sum)}</div>,
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
    meta: { align: "right" },
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-0.5">
        <Button
          variant="ghost"
          className="hover:bg-muted/50 h-6 w-6 p-0"
          title="Просмотр"
          onClick={() => onEdit(row.original.id)}
        >
          <Eye className="text-muted-foreground/70 h-3 w-3" />
        </Button>

        <Button asChild variant="ghost" className="h-6 w-6 p-0 hover:bg-green-500/10">
          <Link href={`/dashboard/test/${row.original.id}/flight-finance`} title="Финансы рейса">
            <DollarSign className="text-muted-foreground/70 h-3.5 w-3.5 transition-colors hover:text-green-600" />
          </Link>
        </Button>

        <Button asChild variant="ghost" className="hover:bg-muted/50 h-6 w-6 p-0">
          <Link href={`/dashboard/test/${row.original.id}/shipments`} title="Открыть отправки">
            <ChevronRight className="text-muted-foreground/70 h-3 w-3" />
          </Link>
        </Button>
      </div>
    ),
  },
];
