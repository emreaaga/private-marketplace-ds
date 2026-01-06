"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Switch } from "@/shared/ui/atoms/switch";

import { Flight } from "./types";

function RouteStepper({
  from,
  to,
  departureDate,
  arrivalDate,
  active = "from",
}: {
  from: string;
  to: string;
  departureDate: string;
  arrivalDate: string;
  active?: "from" | "to";
}) {
  return (
    <div className="relative flex items-center">
      <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-gray-300" />

      <div className="relative z-10 flex flex-col items-center gap-1">
        <span className="text-muted-foreground text-[10px] whitespace-nowrap">{from}</span>

        <div
          className={`h-2.5 w-2.5 rounded-full border-2 ${
            active === "from" ? "border-primary bg-primary" : "border-gray-300 bg-white"
          }`}
        />

        <span className="text-muted-foreground text-[10px] whitespace-nowrap">{departureDate}</span>
      </div>

      <div className="w-10" />

      <div className="relative z-10 flex flex-col items-center gap-1">
        <span className="text-muted-foreground text-[10px] whitespace-nowrap">{to}</span>

        <div
          className={`h-2.5 w-2.5 rounded-full border-2 ${
            active === "to" ? "border-primary bg-primary" : "border-gray-300 bg-white"
          }`}
        />

        <span className="text-muted-foreground text-[10px] whitespace-nowrap">{arrivalDate}</span>
      </div>
    </div>
  );
}

export const FlightsColumns: ColumnDef<Flight>[] = [
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
    accessorKey: "col3",
    header: "Пункт 1",
    cell: () => <Badge className="rounded-sm text-xs">38 - 2800K</Badge>,
  },
  {
    accessorKey: "col4",
    header: "Таможня",
    cell: () => <Badge className="rounded-sm text-xs">38 - 2800K</Badge>,
  },
  {
    accessorKey: "col5",
    header: "Самолёт",
    cell: () => (
      <RouteStepper from="TR-IST" to="UZ-TAS" departureDate="12.01.25" arrivalDate="12.01.25" active="from" />
    ),
  },

  {
    accessorKey: "col6",
    header: "Таможня",
    cell: () => <Badge className="rounded-sm text-xs">38 - 2800K</Badge>,
  },
  {
    accessorKey: "col7",
    header: "Пункт 2",
    cell: ({ row }) => <Badge className="rounded-sm text-xs">38 - 2800K</Badge>,
  },
  {
    accessorKey: "col8",
    header: "Курьер",
    cell: ({ row }) => <Badge className="rounded-sm text-xs">38 - 2800K</Badge>,
  },
  {
    accessorKey: "col9",
    header: "Пол. клиент",
    cell: ({ row }) => <Badge className="rounded-sm text-xs">38 - 2800K</Badge>,
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
