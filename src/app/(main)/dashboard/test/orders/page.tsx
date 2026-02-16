"use client";

import { useMemo, useState } from "react";

import { useOrdersList } from "@/features/orders/queries/use-orders-list";
import { OrdersToolbar } from "@/features/orders/ui/organisms/sections/orders-toolbar";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { OrdersColumns } from "./_components/orders-columns";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function OrdersPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useOrdersList({ page });

  const orders = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const emptyMessage = isLoading ? "Загрузка..." : isError ? "Ошибка загрузки заказов" : "Заказы не найдены";

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  const columns = useMemo(() => OrdersColumns, []);

  return (
    <div className="space-y-4">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <DataTable
        columns={columns}
        data={orders}
        emptyMessage={emptyMessage}
        serverPagination={{ page, pageCount, onPageChange }}
        fixedPageSize={10}
      />
    </div>
  );
}
