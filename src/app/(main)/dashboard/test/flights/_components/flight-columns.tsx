"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, DollarSign, Eye, PackageCheck } from "lucide-react";

import type { Flight } from "@/shared/types/flight/flight.model";
import { FLIGHT_STATUS_META } from "@/shared/types/flight/flight.status.meta";
import type { UserAuth } from "@/shared/types/users/user.auth";
import { Button } from "@/shared/ui/atoms/button";
import { StatusProgress } from "@/shared/ui/atoms/status-progress";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

export const createFlightsColumns = (
  onEdit: (id: number) => void,
  onCustomsConfirm: (id: number) => void,
  user: UserAuth | null,
): ColumnDef<Flight>[] => {
  // Вычисляем роли на основе переданного пользователя
  const isAdmin = user?.company_type === "platform";
  const isCustomsBroker = user?.company_type === "customs_broker";

  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <button
          onClick={() => row.toggleExpanded()}
          className="text-muted-foreground hover:text-primary cursor-pointer font-mono text-xs transition-colors hover:underline"
        >
          {row.original.id}
        </button>
      ),
    },
    {
      accessorKey: "route",
      header: "Маршрут",
    },
    ...(isAdmin
      ? [
          {
            accessorKey: "air_kg_price",
            header: "Ставка",
            cell: ({ row }) => <div>{formatMoney(row.original.air_kg_price)}</div>,
          } as ColumnDef<Flight>,
        ]
      : []),
    {
      accessorKey: "status",
      header: "Статус",
      cell: ({ row }) => {
        const status = row.original.status;
        const { Icon, step, label } = FLIGHT_STATUS_META[status];

        return (
          <div className="ml-1 flex items-center justify-start">
            <StatusProgress step={step} totalSteps={4} Icon={Icon} label={label} />
          </div>
        );
      },
    },
    ...(isAdmin
      ? [
          {
            accessorKey: "total_shipments",
            header: "Отп",
          } as ColumnDef<Flight>,
        ]
      : []),
    {
      accessorKey: "final_gross_weight_kg",
      header: "Вес",
      cell: ({ row }) => {
        const value = row.original.final_gross_weight_kg;
        return value === null ? formatWeight(0, "warning") : formatWeight(value);
      },
    },
    ...(isAdmin
      ? [
          {
            accessorKey: "prepaid_sum",
            header: "Взнос",
            cell: ({ row }) => <div>{formatMoney(row.original.prepaid_sum)}</div>,
          } as ColumnDef<Flight>,
          {
            accessorKey: "remaining_sum",
            header: "Остаток",
            cell: ({ row }) => <div>{formatMoney(row.original.remaining_sum)}</div>,
          } as ColumnDef<Flight>,
        ]
      : []),
    {
      accessorKey: "arrival_at",
      header: "Прибытие",
      cell: ({ row }) => {
        const value = row.original.arrival_at;
        return <span className="text-muted-foreground text-sm">{new Date(value).toLocaleDateString("ru-RU")}</span>;
      },
    },
    {
      id: "actions",
      header: "",
      meta: { align: "right" },
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <div className="flex items-center justify-end gap-0.5">
            {isAdmin && (
              <>
                <Button
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-gray-500/10"
                  title="Просмотр"
                  onClick={() => onEdit(row.original.id)}
                >
                  <Eye className="text-muted-foreground/70 h-3 w-3" />
                </Button>

                <Button asChild variant="ghost" className="h-6 w-6 p-0 hover:bg-green-500/10">
                  <Link href={`/dashboard/test/${row.original.id}/flight-finance`} title="Финансы рейса">
                    <DollarSign className="text-muted-foreground/70 h-3.5 w-3.5 transition-colors hover:text-green-600" />
                  </Link>
                </Button>
              </>
            )}

            {isCustomsBroker && status === "planned" && (
              <Button
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-blue-500/10"
                title="Подтвердить прием с таможни"
                onClick={() => onCustomsConfirm(row.original.id)}
              >
                <PackageCheck className="text-muted-foreground/70 h-3.5 w-3.5 transition-colors hover:text-blue-600" />
              </Button>
            )}

            <Button asChild variant="ghost" className="h-6 w-6 p-0 hover:bg-gray-500/10">
              <Link href={`/dashboard/test/${row.original.id}/shipments`} title="Открыть отправки">
                <ChevronRight className="text-muted-foreground/70 h-3 w-3" />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];
};
