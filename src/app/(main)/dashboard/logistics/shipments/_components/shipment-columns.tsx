"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Switch } from "@/shared/ui/atoms/switch";
import { TableBadge } from "@/shared/ui/molecules/table-badge";

import { Shipment } from "./types";

export const ShipmentColumns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "code",
    header: "NO отп",
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
    accessorKey: "col1",
    header: "Отп. клиент",
    cell: () => <TableBadge tooltip="12.09.2025 · 14:32">Client-1</TableBadge>,
  },

  {
    accessorKey: "col2",
    header: "Курьер",
    cell: () => <TableBadge>Курьер</TableBadge>,
  },

  {
    accessorKey: "col3",
    header: "Пункт 1",
    cell: () => <TableBadge>IST-A01</TableBadge>,
  },

  {
    accessorKey: "col4",
    header: "Таможня",
    cell: () => <TableBadge>IST-таможня</TableBadge>,
  },

  {
    accessorKey: "col5",
    header: "Самолет",
    cell: () => <TableBadge>TR–UZ</TableBadge>,
  },

  {
    accessorKey: "col6",
    header: "Таможня",
    cell: () => <TableBadge>TAS-таможня</TableBadge>,
  },

  {
    accessorKey: "col7",
    header: "Пункт 2",
    cell: () => <TableBadge>TAS-A02</TableBadge>,
  },

  {
    accessorKey: "col8",
    header: "Курьер",
    cell: () => <TableBadge>Курьер</TableBadge>,
  },

  {
    accessorKey: "col9",
    header: "Пол. клиент",
    cell: () => (
      <TableBadge variant="outline" tooltip="Получено клиентом">
        SKD-client
      </TableBadge>
    ),
  },

  {
    id: "actions",
    header: "",
    cell: () => (
      <Link href="/dashboard/logistics/orders">
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    ),
  },
];
