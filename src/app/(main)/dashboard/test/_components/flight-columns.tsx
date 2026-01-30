import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import type { Flight } from "@/shared/types/flight/flight.model";
import { FLIGHT_STATUS_META } from "@/shared/types/flight/flight.status.meta";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";

import { formatWeight } from "./finance";

export function createFlightsColumns(onEdit: (id: number) => void): ColumnDef<Flight>[] {
  return [
    {
      accessorKey: "id",
      header: "Рейс",
      cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}</span>,
    },
    { accessorKey: "route", header: "Маршрут" },
    {
      accessorKey: "air_partner_name",
      header: "Авиапартнер",
      cell: ({ row }) => {
        const name = row.original.air_partner_name;
        const price = row.original.air_kg_price;
        if (!name) return "—";
        return (
          <span>
            {name}
            {price && <span className="text-muted-foreground ml-2 text-xs">${Number(price).toFixed(2)}/кг</span>}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Статус",
      cell: ({ row }) => {
        const meta = FLIGHT_STATUS_META[row.original.status];
        const Icon = meta.Icon;
        return (
          <Badge variant="secondary" className="gap-1">
            <Icon className="opacity-70" />
            {meta.label}
          </Badge>
        );
      },
    },
    { accessorKey: "shipments_count", header: "Отправки", meta: { align: "right" } },
    {
      accessorKey: "final_gross_weight_kg",
      header: "Вес",
      meta: { align: "right" },
      cell: ({ row }) => {
        const value = row.original.final_gross_weight_kg;
        if (value === null) return <span className="text-muted-foreground text-xs">Ожд.</span>;
        return formatWeight(Number(value));
      },
    },
    {
      accessorKey: "arrival_at",
      header: "Прибытие",
      cell: ({ row }) => {
        const value = row.original.arrival_at;
        if (!value) return "—";
        const date = new Date(value);
        return (
          <span className="text-muted-foreground text-xs">
            {date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" })}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Button variant="ghost" className="h-6 w-6 p-0" onClick={() => onEdit(row.original.id)}>
          <Eye className="h-3 w-3" />
        </Button>
      ),
    },
  ];
}
