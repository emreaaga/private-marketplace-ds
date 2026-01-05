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
    header: "Отп. клиент",
    cell: () => <Badge className="rounded-sm text-xs">38 – 2800K</Badge>,
  },
  {
    accessorKey: "col2",
    header: "Курьер",
    cell: () => <Badge className="rounded-sm text-xs">38 - 2800K</Badge>,
  },
  {
    accessorKey: "col3",
    header: "Пункт 1",
    cell: () => <Badge className="rounded-sm text-xs">38 - 2800K</Badge>,
  },
  {
    accessorKey: "col4",
    header: "Самолет",
    cell: () => <Badge className="rounded-sm text-xs">38 - 2800K</Badge>,
  },
  {
    accessorKey: "col5",
    header: "Таможня",
    cell: () => (
      <Badge variant="outline" className="rounded-sm text-xs">
        38 - 2800K
      </Badge>
    ),
  },
  {
    accessorKey: "col6",
    header: "Пункт 2",
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-sm text-xs">
        38 - 2800K
      </Badge>
    ),
  },
  {
    accessorKey: "col7",
    header: "Курьер",
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-sm text-xs">
        38 - 2800K
      </Badge>
    ),
  },
  {
    accessorKey: "col8",
    header: "Пол. клиент",
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-sm text-xs">
        38 - 2800K
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
