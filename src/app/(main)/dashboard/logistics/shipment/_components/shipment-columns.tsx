"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, MoreHorizontal } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";
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
        <div className="flex items-center justify-end gap-1">
          <Link href={"/dashboard/logistics/shipment/orders"}>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={"/dashboard/logistics/shipment/posts"}>Почты</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  // TODO: edit shipment
                }}
              >
                Правка
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  // TODO: change status
                }}
              >
                Статус
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive"
                onClick={() => {
                  // TODO: archive shipment (confirm!)
                }}
              >
                Архив
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
