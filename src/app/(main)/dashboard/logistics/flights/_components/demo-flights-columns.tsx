"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";

export interface Flight {
  id: string;
  code: string;
  route: string[];
  participantsCount: number;
  shipmentsCount: number;
  totalWeightKg: number;
  totalAmount: number;
  currency: "USD" | "EUR";
  status: "planned" | "in_transit" | "customs" | "delivered";
  departureAt: string;
  arrivalEta: string;
}

export const DemoFlightsColumns: ColumnDef<Flight>[] = [
  {
    accessorKey: "code",
    header: "Рейс",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-xs">{row.original.id}</span>,
  },

  {
    accessorKey: "route",
    header: "Маршрут",
    cell: ({ row }) => {
      const route = row.original.route;
      return (
        <span className="text-xs whitespace-nowrap">
          {route[0]} → {route[route.length - 1]}
        </span>
      );
    },
  },

  {
    accessorKey: "participantsCount",
    header: "Участн.",
    cell: ({ row }) => <span className="text-xs font-medium">{row.original.participantsCount}</span>,
  },

  {
    accessorKey: "shipmentsCount",
    header: "Посылки",
    cell: ({ row }) => <span className="text-xs">{row.original.shipmentsCount}</span>,
  },

  {
    accessorKey: "totalWeightKg",
    header: "Вес",
    cell: ({ row }) => <span className="text-xs whitespace-nowrap">{row.original.totalWeightKg} кг</span>,
  },

  {
    accessorKey: "totalAmount",
    header: "Оборот",
    cell: ({ row }) => (
      <span className="text-xs whitespace-nowrap">${row.original.totalAmount.toLocaleString("ru-RU")}</span>
    ),
  },

  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const STATUS_MAP: Record<Flight["status"], { label: string; className: string }> = {
        planned: {
          label: "Ожд.",
          className: "bg-slate-500/15 text-slate-700",
        },
        in_transit: {
          label: "В пут.",
          className: "bg-blue-500/15 text-blue-700",
        },
        customs: {
          label: "Тамож.",
          className: "bg-yellow-500/15 text-yellow-700",
        },
        delivered: {
          label: "Готов",
          className: "bg-green-500/15 text-green-700",
        },
      };

      const status = row.original.status;

      return (
        <Badge variant="outline" className={STATUS_MAP[status].className}>
          {STATUS_MAP[status].label}
        </Badge>
      );
    },
  },

  {
    id: "period",
    header: "Время",
    cell: ({ row }) => {
      const departure = new Date(row.original.departureAt);

      return (
        <span className="text-xs whitespace-nowrap">
          {departure.toLocaleDateString("ru-RU")}{" "}
          {departure.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Link href={`/dashboard/logistics/shipments`}>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </Link>
    ),
  },
];
