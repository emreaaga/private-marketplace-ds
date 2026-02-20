"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { useOrdersList } from "@/features/orders/queries/use-orders-list";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { OrdersColumns } from "../../orders/_components/orders-columns";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function ShipmentOrdersPage() {
  const params = useParams();

  const shipmentId = Number(params.id);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useOrdersList({
    page,
    shipment_id: shipmentId,
  });

  const orders = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const emptyMessage = isLoading
    ? "Загрузка заказов..."
    : isError
      ? "Не удалось загрузить заказы"
      : "В этой отправке пока нет заказов";

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight">Заказы отправки {shipmentId}</h1>
      </div>

      <DataTable
        columns={OrdersColumns}
        data={orders}
        emptyMessage={emptyMessage}
        serverPagination={{
          page,
          pageCount,
          onPageChange,
        }}
        fixedPageSize={10}
      />
    </div>
  );
}
