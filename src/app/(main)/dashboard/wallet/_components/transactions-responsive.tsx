"use client";

import dynamic from "next/dynamic";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { ListSkeleton } from "@/shared/ui/molecules/list-skeleton";
import { LoadingPlaceholder } from "@/shared/ui/molecules/loading-placeholder";
import { TableSkeleton } from "@/shared/ui/molecules/table-skeleton";

import type { Transaction } from "./transactions-columns";

const TransactionsMobileList = dynamic(
  () => import("./transactions-mobile-list").then((m) => m.TransactionsMobileList),
  {
    loading: () => <ListSkeleton rows={3} />,
  },
);

const TransactionsDesktopTable = dynamic(
  () => import("@/shared/ui/organisms/table/data-table").then((m) => m.DataTable),
  {
    loading: () => <TableSkeleton rows={6} columns={2} />,
  },
);

interface TransactionsResponsiveProps {
  data: Transaction[];
  columns: any;
}

export function TransactionsResponsive({ data, columns }: TransactionsResponsiveProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <LoadingPlaceholder />;
  }

  return isMobile ? (
    <TransactionsMobileList data={data} />
  ) : (
    <TransactionsDesktopTable columns={columns} data={data} pageSize={10} emptyMessage="Транзакций нет" />
  );
}
