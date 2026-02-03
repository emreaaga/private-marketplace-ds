import { ColumnDef } from "@tanstack/react-table";

import type { Shipment } from "@/shared/types/shipment/shipment.model";
import { SHIPMENT_STATUS_META } from "@/shared/types/shipment/shipment.status.meta";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

export const ShipmentsColumns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "id",
    header: "Отправка",
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}</span>,
  },

  {
    accessorKey: "company_name",
    header: "Почта",
  },

  {
    accessorKey: "route",
    header: "Маршрут",
  },

  {
    accessorKey: "orders_count",
    header: "Заказы",
    cell: ({ getValue }) => formatQuantity(getValue<string | number>(), { unit: "шт" }),
  },

  {
    accessorKey: "total_weight_kg",
    header: "Вес",
    cell: ({ getValue }) => formatWeight(getValue<number>()),
  },

  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.original.status;
      const meta = SHIPMENT_STATUS_META[status];
      const Icon = meta.Icon;

      return (
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Icon className="h-4 w-4" />
          <span>{meta.label}</span>
        </div>
      );
    },
  },
];
