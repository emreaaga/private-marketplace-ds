import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { DollarSign, Eye } from "lucide-react";

import { OrdersListItemApi } from "@/features/orders/api/orders";
import { ORDER_STATUS_META } from "@/shared/types/order/order.status.meta";
import { Button } from "@/shared/ui/atoms/button";
import { StatusProgress } from "@/shared/ui/atoms/status-progress";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

export const getOrdersColumns = (onView: (id: number) => void, onHover: () => void): ColumnDef<OrdersListItemApi>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: "sender_name",
    header: "Отпр",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-24 truncate text-[13px] font-medium" title={row.original.sender_name}>
        {row.original.sender_name}
      </div>
    ),
  },
  {
    accessorKey: "receiver_name",
    header: "Полч",
    cell: ({ row }) => (
      <div
        className="text-muted-foreground max-w-24 truncate text-[13px] font-medium"
        title={row.original.receiver_name}
      >
        {row.original.receiver_name}
      </div>
    ),
  },
  {
    accessorKey: "weight_kg",
    header: "Вес",
    cell: ({ getValue }) => formatWeight(getValue<string>()),
  },
  {
    accessorKey: "rate_per_kg",
    header: "Ставка",
    cell: ({ getValue }) => formatMoney(getValue<string>()),
  },
  {
    accessorKey: "extra_fee",
    header: "Доплата",
    cell: ({ getValue }) => formatMoney(getValue<string>()),
  },
  {
    accessorKey: "prepaid_amount",
    header: "Взнос",
    cell: ({ getValue }) => formatMoney(getValue<string>()),
  },
  {
    accessorKey: "balance",
    header: "Остаток",
    meta: { align: "right" },
    cell: ({ getValue }) => formatMoney(getValue<string>()),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const statusMeta = ORDER_STATUS_META[row.original.status];

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
      const value = row.original.created_at;
      return <span className="text-muted-foreground text-sm">{new Date(value).toLocaleDateString("ru-RU")}</span>;
    },
  },
  {
    id: "actions",
    header: "",
    meta: { align: "right" },
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-0.5">
        <Button
          variant="ghost"
          className="hover:bg-muted/50 h-6 w-6 p-0"
          onClick={() => onView(row.original.id)}
          onMouseEnter={onHover}
          title="Просмотр заказа"
        >
          <Eye className="text-muted-foreground/70 h-3 w-3" />
        </Button>

        <Button asChild variant="ghost" className="h-6 w-6 p-0 hover:bg-green-500/10 hover:text-green-600">
          <Link href={`/dashboard/test/orders/${row.original.id}/finance`}>
            <DollarSign className="text-muted-foreground/70 h-4 w-4 transition-colors" />
          </Link>
        </Button>
      </div>
    ),
  },
];
