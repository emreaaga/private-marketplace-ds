"use client";

import { ColumnDef } from "@tanstack/react-table";

import { FinancialEventApi } from "@/shared/types/financial-events/financial-event-api";
import { FinancialEventType } from "@/shared/types/financial-events/financial-event-type";
import { FINANCIAL_EVENT_STATUS_CONFIG } from "@/shared/types/financial-events/financial-events-type.meta";
import { Badge } from "@/shared/ui/atoms/badge";
import { formatMoney } from "@/shared/ui/molecules/format-money";

export const financialEventsColumns: ColumnDef<FinancialEventApi>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "Тип",
    cell: ({ getValue }) => {
      const type = getValue<FinancialEventType>();
      const config = FINANCIAL_EVENT_STATUS_CONFIG[type];

      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
  },
  {
    accessorKey: "description",
    header: "Описание",
    cell: ({ getValue }) => {
      const description = getValue<string>();

      return (
        <div className="max-w-75 truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Сумма",
    cell: ({ getValue }) => formatMoney(getValue<string>()),
  },
  {
    accessorKey: "created_at",
    header: "Дата",
    cell: ({ row }) => {
      const value = row.original.created_at;
      return <span className="text-muted-foreground text-sm">{new Date(value).toLocaleDateString("ru-RU")}</span>;
    },
  },
];
