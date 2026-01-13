import { ColumnDef } from "@tanstack/react-table";
import { Calendar, ShieldCheck, ArrowUpRight, Plane, ArrowDownLeft, CheckCircle } from "lucide-react";

import { Badge } from "@/shared/ui/atoms/badge";

import { formatMoney, formatWeight } from "./finance";
import { Flight } from "./flight-types";

export const STATUS_META: Record<
  Flight["status"],
  {
    label: string;
    icon: React.ElementType;
    variant: "default" | "secondary" | "destructive";
  }
> = {
  PLANNED: { label: "План", icon: Calendar, variant: "secondary" },
  READY_FOR_CUSTOMS: { label: "К таможне", icon: ShieldCheck, variant: "secondary" },
  CUSTOMS_OUT: { label: "Таможня", icon: ArrowUpRight, variant: "default" },
  IN_AIR: { label: "В пути", icon: Plane, variant: "default" },
  CUSTOMS_IN: { label: "Таможня", icon: ArrowDownLeft, variant: "default" },
  ARRIVED: { label: "Прибыл", icon: CheckCircle, variant: "secondary" },
  CLOSED: { label: "Закрыт", icon: CheckCircle, variant: "secondary" },
};

export const FlightsColumns: ColumnDef<Flight>[] = [
  {
    accessorKey: "id",
    header: "Рейс",
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}</span>,
  },
  {
    accessorKey: "route",
    header: "Маршрут",
  },
  {
    accessorKey: "departureDate",
    header: "Вылет",
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const meta = STATUS_META[row.original.status];
      const Icon = meta.icon;

      return (
        <Badge variant={meta.variant} className="gap-1">
          <Icon size={14} className="opacity-70" />
          {meta.label}
        </Badge>
      );
    },
  },

  {
    accessorKey: "shipmentsCount",
    header: "Отправки",
    meta: { align: "right" },
  },
  {
    accessorKey: "totalWeightKg",
    header: "Вес",
    meta: { align: "right" },
    cell: ({ row }) => formatWeight(row.original.totalWeightKg),
  },

  {
    accessorKey: "expensesUsd",
    header: "Расходы",
    meta: { align: "right" },
    cell: ({ row }) => formatMoney(row.original.expensesUsd),
  },

  {
    accessorKey: "incomeUsd",
    header: "Доход",
    meta: { align: "right" },
    cell: ({ row }) => formatMoney(row.original.incomeUsd),
  },

  {
    id: "balance",
    header: "Баланс",
    cell: ({ row }) => {
      const balance = row.original.incomeUsd - row.original.expensesUsd;
      return <span className={balance < 0 ? "text-red-600" : "text-green-600"}>{formatMoney(balance)}</span>;
    },
  },
];
