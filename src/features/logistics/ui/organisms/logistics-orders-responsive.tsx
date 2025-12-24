"use client";

import dynamic from "next/dynamic";

import type { Order } from "@/features/logistics/types/order.types";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { LoadingPlaceholder } from "@/shared/ui/molecules/loading-placeholder";
import { TableSkeleton } from "@/shared/ui/molecules/table-skeleton";

const LogisticsOrdersTable = dynamic(() => import("@/shared/ui/organisms/table/data-table").then((m) => m.DataTable), {
  loading: () => <TableSkeleton rows={8} columns={6} />,
});

interface OrdersResponsiveProps {
  data: Order[];
  columns: any;
}

export function LogisticsOrdersResponsive({ data, columns }: OrdersResponsiveProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <LoadingPlaceholder label="Подготовка таблицы…" />;
  }

  return <LogisticsOrdersTable data={data} columns={columns} pageSize={isMobile ? 5 : 10} />;
}
