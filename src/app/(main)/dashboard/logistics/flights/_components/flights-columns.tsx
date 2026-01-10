"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Switch } from "@/shared/ui/atoms/switch";
import { TableBadge } from "@/shared/ui/molecules/table-badge";

export const MOCK_FLIGHTS = [
  {
    id: "1",
    code: "001",
    route: "TR → UZ",
    ordersCount: 5,
    weightKg: 120,
    total: 1800,
    status: "В пути",
    locked: true,
  },
  {
    id: "2",
    code: "002",
    route: "CH → UZ",
    ordersCount: 3,
    weightKg: 70,
    total: 950,
    status: "Ожидание",
    locked: false,
  },
];

export type Flight = {
  id: string;
  code: string;
  route: string;
  ordersCount: number;
  weightKg: number;
  total: number;
  status: string;
  locked: boolean;
};

export const FlightsColumns: ColumnDef<Flight>[] = [
  {
    accessorKey: "code",
    header: "ID",
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
    cell: () => "Client - 1",
  },

  {
    accessorKey: "col2",
    header: "Курьер",
    cell: () => "Курьер",
  },

  {
    accessorKey: "col3",
    header: "Пункт 1",
    cell: () => "IST-A01",
  },

  {
    accessorKey: "col4",
    header: "Таможня",
    cell: () => "IST-таможня",
  },

  {
    accessorKey: "col5",
    header: "Самолет",
    cell: () => "TR–UZ",
  },

  {
    accessorKey: "col6",
    header: "Таможня",
    cell: () => "TAS-таможня",
  },

  {
    accessorKey: "col7",
    header: "Пункт 2",
    cell: () => "TAS-A02",
  },

  {
    accessorKey: "col8",
    header: "Курьер",
    cell: () => "Курьер",
  },

  {
    accessorKey: "col9",
    header: "Пол. клиент",
    cell: () => "SKD-client",
  },

  {
    id: "actions",
    header: "",
    enableHiding: false,
    cell: () => (
      <Link href="/dashboard/logistics/orders">
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    ),
  },
];
