"use client";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Eye, PackageCheck, Truck } from "lucide-react";

import { FLIGHT_STATUS_META, type Flight } from "@/entities/flight";
import type { UserAuth } from "@/entities/user";
import { Button } from "@/shared/ui/atoms/button";
import { StatusProgress } from "@/shared/ui/atoms/status-progress";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

export const createFlightsColumns = (
  onEdit: (id: number) => void,
  onCustomsConfirm: (id: number) => void,
  onCreateTrip: (flightId: number) => void,
  user: UserAuth | null,
): ColumnDef<Flight>[] => {
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
        const tripId = row.original.trip_id;
        const flightId = row.original.id; // ID самого рейса
        const hasTrip = Boolean(tripId);

        return (
          <div className="flex items-center justify-end gap-0.5">
            {isAdmin && (
              <>
                <Button
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-gray-500/10"
                  title="Просмотр"
                  onClick={() => onEdit(flightId)}
                >
                  <Eye className="text-muted-foreground/70 h-3 w-3" />
                </Button>

                {/* Если есть маршрут — ссылка, если нет — желтая кнопка добавления */}
                {hasTrip ? (
                  <Button asChild variant="ghost" className="h-6 w-6 p-0 transition-all hover:bg-zinc-950/5">
                    <Link href={`/dashboard/test/${tripId}/trips`} title="Маршрут рейса">
                      <Truck className="h-3.5 w-3.5 text-zinc-500 transition-colors hover:text-zinc-950" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => onCreateTrip(flightId)}
                    className="h-6 w-6 p-0 transition-all hover:bg-yellow-500/10"
                    title="Создать маршрут"
                  >
                    <Truck className="h-3.5 w-3.5 text-yellow-500 transition-colors hover:text-yellow-600" />
                  </Button>
                )}
              </>
            )}

            {isCustomsBroker && status === "planned" && (
              <Button
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-blue-500/10"
                title="Подтвердить прием с таможни"
                onClick={() => onCustomsConfirm(flightId)}
              >
                <PackageCheck className="text-muted-foreground/70 h-3.5 w-3.5 transition-colors hover:text-blue-600" />
              </Button>
            )}

            <Button asChild variant="ghost" className="h-6 w-6 p-0 hover:bg-gray-500/10">
              <Link href={`/dashboard/test/${flightId}/shipments`} title="Открыть отправки">
                <ChevronRight className="text-muted-foreground/70 h-3 w-3" />
              </Link>
            </Button>
          </div>
        );
      },
    },
  ];
};
