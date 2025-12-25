"use client";

import dynamic from "next/dynamic";

import type { ColumnDef } from "@tanstack/react-table";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { LoadingPlaceholder } from "@/shared/ui/molecules/loading-placeholder";
import { TableSkeleton } from "@/shared/ui/molecules/table-skeleton";
import type { DataTableProps } from "@/shared/ui/organisms/table/data-table";

import { OrderPaymentDetails } from "./order-payment-details";
import { Order } from "./orders.type";

const LogisticsOrdersTable = dynamic<DataTableProps<Order>>(
  () =>
    import("@/shared/ui/organisms/table/data-table").then(
      (m) => m.DataTable as React.ComponentType<DataTableProps<Order>>,
    ),
  {
    loading: () => <TableSkeleton rows={3} columns={7} />,
  },
);

interface OrdersResponsiveProps {
  data: Order[];
  columns: ColumnDef<Order, unknown>[];
}

export default function SellersOrdersResponsive({ data, columns }: OrdersResponsiveProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <LoadingPlaceholder />;
  }

  return (
    <LogisticsOrdersTable
      data={data}
      columns={columns}
      pageSize={isMobile ? 5 : 10}
      renderExpandedRow={(order: Order) => <OrderPaymentDetails order={order} />}
    />
  );
}
