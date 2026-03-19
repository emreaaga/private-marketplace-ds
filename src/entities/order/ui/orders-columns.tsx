import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { DollarSign, Eye } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { StatusProgress } from "@/shared/ui/atoms/status-progress";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

import { OrderListItem } from "../api/types/orders.types";
import { ORDER_STATUS_META } from "../model/order.status.meta";

export const getOrdersColumns = (onView: (id: number) => void, onHover: () => void): ColumnDef<OrderListItem>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const data = row.original;
      if (!data) return null;
      return <span className="text-muted-foreground font-mono text-xs">{data.id}</span>;
    },
  },
  {
    accessorKey: "company_name",
    header: "Фирма",
  },
  {
    accessorKey: "sender_name",
    header: "Отпр",
    cell: ({ row }) => {
      const data = row.original;
      if (!data) return null;
      return (
        <div className="text-muted-foreground max-w-24 truncate text-[13px] font-medium" title={data.sender_name}>
          {data.sender_name}
        </div>
      );
    },
  },
  {
    accessorKey: "receiver_name",
    header: "Полч",
    cell: ({ row }) => {
      const data = row.original;
      if (!data) return null;
      return (
        <div className="text-muted-foreground max-w-24 truncate text-[13px] font-medium" title={data.receiver_name}>
          {data.receiver_name}
        </div>
      );
    },
  },
  {
    accessorKey: "weight_kg",
    header: "Вес",
    cell: ({ getValue }) => {
      const val = getValue<string>();
      return val ? formatWeight(val) : "—";
    },
  },
  {
    accessorKey: "rate_per_kg",
    header: "Ставка",
    cell: ({ getValue }) => {
      const val = getValue<string>();
      return val ? formatMoney(val) : "—";
    },
  },
  {
    accessorKey: "extra_fee",
    header: "Доплата",
    cell: ({ getValue }) => {
      const val = getValue<string>();
      return val ? formatMoney(val) : "—";
    },
  },
  {
    accessorKey: "prepaid_amount",
    header: "Взнос",
    cell: ({ getValue }) => {
      const val = getValue<string>();
      return val ? formatMoney(val) : "—";
    },
  },
  {
    accessorKey: "balance",
    header: "Остаток",
    meta: { align: "right" },
    cell: ({ getValue }) => {
      const val = getValue<string>();
      return val ? formatMoney(val) : "—";
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const data = row.original;
      if (!data) return null;

      const statusMeta = ORDER_STATUS_META[data.status];
      if (!statusMeta) return data.status;

      return (
        <div className="ml-1 flex items-center justify-start">
          <StatusProgress step={statusMeta.step} totalSteps={5} Icon={statusMeta.icon} label={statusMeta.label} />
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Дата",
    cell: ({ row }) => {
      const data = row.original;
      if (!data?.created_at) return "—";
      return (
        <span className="text-muted-foreground text-sm">{new Date(data.created_at).toLocaleDateString("ru-RU")}</span>
      );
    },
  },
  {
    id: "actions",
    header: "",
    meta: { align: "right" },
    cell: ({ row }) => {
      const data = row.original;
      if (!data) return null;

      return (
        <div className="flex items-center justify-end gap-0.5">
          <Button
            variant="ghost"
            className="hover:bg-muted/50 h-6 w-6 p-0"
            onClick={() => onView(data.id)}
            onMouseEnter={onHover}
            title="Просмотр заказа"
          >
            <Eye className="text-muted-foreground/70 h-3 w-3" />
          </Button>

          <Button asChild variant="ghost" className="h-6 w-6 p-0 hover:bg-green-500/10 hover:text-green-600">
            <Link href={`/dashboard/test/orders/${data.id}/finance`}>
              <DollarSign className="text-muted-foreground/70 h-4 w-4 transition-colors" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
