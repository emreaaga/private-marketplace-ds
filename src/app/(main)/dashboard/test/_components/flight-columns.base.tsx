import type { ColumnDef } from "@tanstack/react-table";

import type { Flight } from "@/shared/types/flight/flight.model";
import { FLIGHT_STATUS_META } from "@/shared/types/flight/flight.status.meta";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

export const flightsBaseColumns: ColumnDef<Flight>[] = [
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
      const meta = FLIGHT_STATUS_META[row.original.status];
      const Icon = meta.Icon;

      return (
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Icon className="h-4 w-4 opacity-70" />
          <span>{meta.label}</span>
        </div>
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
      return value === null ? formatWeight(0, "warning") : formatWeight(value);
    },
  },
  {
    accessorKey: "arrival_at",
    header: "Прибытие",
    cell: ({ row }) => {
      const value = row.original.arrival_at;
      if (!value) return "—";

      return <span className="text-muted-foreground text-xs">{new Date(value).toLocaleDateString("ru-RU")}</span>;
    },
  },
];
