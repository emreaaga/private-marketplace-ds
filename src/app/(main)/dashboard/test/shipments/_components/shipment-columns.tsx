"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Eye } from "lucide-react";

import type { Shipment } from "@/shared/types/shipment/shipment.model";
import { SHIPMENT_STATUS_META } from "@/shared/types/shipment/shipment.status.meta";
import { Button } from "@/shared/ui/atoms/button";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

export const getShipmentsColumns = (onView: (id: number) => void): ColumnDef<Shipment>[] => [
  {
    accessorKey: "id",
    header: "Отправка",
    cell: ({ row }) => <span className="font-mono text-sm">#{row.original.id}</span>,
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

      const { Icon, step, label } = meta;
      const totalSteps = 5;
      const percentage = (step / totalSteps) * 100;
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
          <Icon className="text-muted-foreground/80 relative z-10 h-3.5 w-3.5" />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    meta: { align: "right" },
    cell: ({ row }) => {
      const shipmentId = row.original.id;

      return (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" className="h-7 w-7 p-0" title="Просмотр" onClick={() => onView(shipmentId)}>
            <Eye className="h-3.5 w-3.5" />
          </Button>

          <Button asChild variant="ghost" className="h-7 w-7 p-0">
            <Link href={`/dashboard/test/${shipmentId}/orders`} title="Открыть заказы">
              <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
