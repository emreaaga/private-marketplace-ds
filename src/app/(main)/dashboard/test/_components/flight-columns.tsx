import { ColumnDef } from "@tanstack/react-table";
import { Calendar, Plane, CheckCircle, MoreHorizontal } from "lucide-react";

import { Flight } from "@/shared/types/flight/flight.model";
import { Badge } from "@/shared/ui/atoms/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/atoms/dropdown-menu";

import { formatMoney, formatWeight } from "./finance";

export const STATUS_META = {
  planned: { label: "План", icon: Calendar, variant: "secondary" },
  departed: { label: "В пути", icon: Plane, variant: "default" },
  arrived: { label: "Прибыл", icon: CheckCircle, variant: "default" },
  closed: { label: "Закрыт", icon: CheckCircle, variant: "secondary" },
} as const;

export const FlightsColumns: ColumnDef<Flight>[] = [
  {
    accessorKey: "id",
    header: "Рейс",
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}</span>,
  },

  {
    accessorKey: "route",
    header: "Маршрут",
  },

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
      const meta = STATUS_META[row.original.status];
      const Icon = meta.icon;

      return (
        <Badge variant={meta.variant} className="gap-1">
          <Icon size={14} className="opacity-70" />
          {meta.label}
        </Badge>
      );
    },
  },

  {
    accessorKey: "shipments_count",
    header: "Отправки",
    meta: { align: "right" },
  },

  {
    accessorKey: "final_gross_weight_kg",
    header: "Вес",
    meta: { align: "right" },
    cell: ({ row }) => {
      const value = row.original.final_gross_weight_kg;

      if (value == null) {
        return <span className="text-muted-foreground text-xs">Ожд.</span>;
      }

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
          {date.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    meta: { align: "right" },
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-muted rounded p-0.5">
              <MoreHorizontal size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Редактировать</DropdownMenuItem>

            {row.original.status !== "closed" && (
              <DropdownMenuItem className="text-red-600">Закрыть рейс</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
