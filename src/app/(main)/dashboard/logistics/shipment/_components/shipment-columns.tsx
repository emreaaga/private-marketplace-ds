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
    accessorKey: "col1",
    header: "Кол1",
    cell: () => (
      <Badge variant="outline" className="rounded-sm text-xs">
        client-1
      </Badge>
    ),
  },
  {
    accessorKey: "col2",
    header: "Кол2",
    cell: () => (
      <Badge variant="outline" className="rounded-sm text-xs">
        Курьер
      </Badge>
    ),
  },
  {
    accessorKey: "col3",
    header: "Кол3",
    cell: () => (
      <Badge variant="outline" className="rounded-sm text-xs">
        IST-A01
      </Badge>
    ),
  },
  {
    accessorKey: "col4",
    header: "Кол4",
    cell: () => (
      <Badge variant="outline" className="rounded-sm text-xs">
        TR-UZ
      </Badge>
    ),
  },
  {
    accessorKey: "col5",
    header: "Кол5",
    cell: () => (
      <Badge variant="outline" className="rounded-sm text-xs">
        TAS-Таможня
      </Badge>
    ),
  },
  {
    accessorKey: "col6",
    header: "Кол6",
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-sm text-xs">
        TAS-A02
      </Badge>
    ),
  },
  {
    accessorKey: "col7",
    header: "Кол7",
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-sm text-xs">
        Курьер
      </Badge>
    ),
  },
  {
    accessorKey: "col8",
    header: "Кол8",
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-sm text-xs">
        SKD-client1
      </Badge>
    ),
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
