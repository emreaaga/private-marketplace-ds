"use client";

import dynamic from "next/dynamic";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { LoadingPlaceholder } from "@/shared/ui/molecules/loading-placeholder";
import { TableSkeleton } from "@/shared/ui/molecules/table-skeleton";

import { Order } from "./orders.type";

const LogisticsOrdersTable = dynamic(() => import("@/shared/ui/organisms/table/data-table").then((m) => m.DataTable), {
  loading: () => <TableSkeleton rows={8} columns={6} />,
});

interface OrdersResponsiveProps {
  data: Order[];
  columns: any;
}

export default function SellersOrdersResponsive({ data, columns }: OrdersResponsiveProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <LoadingPlaceholder label="Подготовка таблицы…" />;
  }

  return <LogisticsOrdersTable data={data} columns={columns} pageSize={isMobile ? 5 : 10} />;
}
