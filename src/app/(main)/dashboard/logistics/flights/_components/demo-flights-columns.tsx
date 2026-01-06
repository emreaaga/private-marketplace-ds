"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";

import { Flight } from "./types";

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
      const [from, to] = row.original.route;

      const [fromCountry, fromCity] = from.split("-");
      const [toCountry, toCity] = to.split("-");

      return (
        <span className="text-xs whitespace-nowrap">
          <span className="font-medium">{fromCountry}</span>
          <span className="text-muted-foreground ml-0.5 text-[10px]">{fromCity}</span>
          <span className="text-muted-foreground mx-0.5 opacity-70">→</span>
          <span className="font-medium">{toCountry}</span>
          <span className="text-muted-foreground ml-0.5 text-[10px]">{toCity}</span>
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
    cell: ({ row }) => (
      <span className="text-xs whitespace-nowrap">
        <span className="font-medium">{row.original.shipmentsCount}</span>
        <span className="text-muted-foreground ml-0.5 text-[10px]">шт</span>
      </span>
    ),
  },

  {
    accessorKey: "totalWeightKg",
    header: "Вес",
    cell: ({ row }) => (
      <span className="text-xs whitespace-nowrap">
        <span className="font-medium">{row.original.totalWeightKg}</span>
        <span className="text-muted-foreground ml-0.5 text-[10px]">кг</span>
      </span>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Оборот",
    cell: ({ row }) => (
      <span className="text-xs whitespace-nowrap">
        <span className="font-medium">{row.original.totalAmount.toLocaleString("ru-RU")}</span>
        <span className="text-muted-foreground ml-0.5 text-[10px]">$</span>
      </span>
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
        <Badge variant="outline" className={`${STATUS_MAP[status].className} px-1.5 py-0 leading-tight`}>
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
          <span className="text-muted-foreground">{departure.toLocaleDateString("ru-RU")}</span>{" "}
          <span className="font-medium">12:30</span>
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Link href={`/dashboard/logistics/shipments`}>
        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-60 hover:opacity-100">
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </Link>
    ),
  },
];
