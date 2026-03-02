"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Eye } from "lucide-react";

import type { Shipment } from "@/shared/types/shipment/shipment.model";
import { SHIPMENT_STATUS_META } from "@/shared/types/shipment/shipment.status.meta";
import { Button } from "@/shared/ui/atoms/button";
import { StatusProgress } from "@/shared/ui/atoms/status-progress";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

export const getShipmentsColumns = (onView: (id: number) => void, onPrefetch: () => void): ColumnDef<Shipment>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "company_name",
    header: "Почта",
    cell: ({ getValue }) => (
      <div className="max-w-20 truncate" title={getValue<string>()}>
        {getValue<string>()}
      </div>
    ),
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
    cell: ({ getValue }) => formatWeight(getValue<string>()),
  },
  {
    accessorKey: "total_prepaid",
    header: "Взнос",
    cell: ({ getValue }) => formatMoney(getValue<string>()),
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
      const { Icon, step, label } = SHIPMENT_STATUS_META[status];

      return <StatusProgress step={step} totalSteps={5} Icon={Icon} label={label} />;
    },
  },
  {
    id: "actions",
    header: "",
    meta: { align: "right" },
    cell: ({ row }) => {
      const shipmentId = row.original.id;

      return (
        <div className="flex items-center justify-end gap-0.5">
          <Button
            variant="ghost"
            className="hover:bg-muted/50 h-6 w-6 p-0"
            title="Просмотр"
            onClick={() => onView(shipmentId)}
            onMouseEnter={onPrefetch}
          >
            <Eye className="text-muted-foreground/70 h-3 w-3" />
          </Button>

          <Button asChild variant="ghost" className="hover:bg-muted/50 h-6 w-6 p-0" onMouseEnter={onPrefetch}>
            <Link href={`/dashboard/test/${shipmentId}/orders`} title="Открыть заказы">
              <ChevronRight className="text-muted-foreground/70 h-3 w-3" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
