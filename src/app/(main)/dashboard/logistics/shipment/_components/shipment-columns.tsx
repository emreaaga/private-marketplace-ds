"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Switch } from "@/shared/ui/atoms/switch";

import { Shipment } from "./types";

export const ShipmentColumns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "code",
    header: "Код",
    cell: ({ row }) => {
      const shipment = row.original;

      return (
        <div className="flex items-center gap-1">
          <Switch checked={!shipment.locked} />
          <span className={shipment.locked ? "text-muted-foreground line-through" : "font-medium"}>
            {shipment.code}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "route",
    header: "Маршрут",
  },
  {
    accessorKey: "ordersCount",
    header: "Заказов",
  },
  {
    accessorKey: "weightKg",
    header: "Вес",
    cell: ({ getValue }) => `${getValue<number>()} кг`,
  },
  {
    accessorKey: "total",
    header: "Сумма",
    cell: ({ getValue }) => `$${getValue<number>()}`,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <Link href={"/dashboard/logistics/orders"}>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];
