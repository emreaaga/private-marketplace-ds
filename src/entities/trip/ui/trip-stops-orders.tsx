"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { DataTable } from "@/widgets/data-table/ui/data-table";

import { useTripStopOrders } from "../queries/use-trip-stop-orders";

import { getTripStopOrdersColumns } from "./trip-stops-orders-columns";

const OrderEditDialog = dynamic(() => import("@/features/order-edit").then((mod) => mod.OrderEditDialog), {
  ssr: false,
});

interface TripStopOrdersProps {
  tripId: number;
  branchId: number;
}

export function TripStopOrders({ tripId, branchId }: TripStopOrdersProps) {
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState<number | null>(null);

  const { data, isLoading, isError } = useTripStopOrders(tripId, branchId, page);

  const orders = data?.data || [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const columns = useMemo(
    () =>
      getTripStopOrdersColumns(
        (id) => setEditId(id),
        () => import("@/features/order-edit"),
      ),
    [],
  );

  const onPageChange = (next: number) => setPage(next);

  const emptyMessage = isLoading ? "Загрузка заказов..." : isError ? "Ошибка при загрузке" : "Заказов не найдено";

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={orders}
        emptyMessage={emptyMessage}
        serverPagination={{
          page,
          pageCount,
          onPageChange,
        }}
        fixedPageSize={10}
      />

      {editId !== null && (
        <OrderEditDialog open={true} orderId={editId} onOpenChange={(open) => !open && setEditId(null)} />
      )}
    </div>
  );
}
