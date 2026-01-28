import { ColumnDef } from "@tanstack/react-table";

import type { Shipment } from "@/shared/types/shipment/shipment.model";
import { formatMoney } from "@/shared/ui/molecules/format-money";
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
  },
];
