"use client";

import { useCallback, useMemo, useState } from "react";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import { useOrdersList } from "@/features/orders/queries/use-orders-list";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { getOrdersColumns } from "../../orders/_components/orders-columns";

const OrderEditDialogLoader = () =>
  import("@/features/orders/ui/organisms/order-edit-dialog").then((m) => m.OrderEditDialog);
const OrderEditDialog = dynamic(OrderEditDialogLoader, { ssr: false });

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function ShipmentOrdersPage() {
  const params = useParams();
  const shipmentId = Number(params.id);

  const [page, setPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isDialogLoaded, setIsDialogLoaded] = useState(false);

  const { data, isLoading, isError } = useOrdersList({
    page,
    shipment_id: shipmentId,
  });

  const orders = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const handleViewOrder = useCallback((id: number) => {
    setSelectedOrderId(id);
    setIsDialogLoaded(true);
    setIsDialogOpen(true);
  }, []);

  const handlePrefetch = useCallback(() => {
    OrderEditDialogLoader();
    setIsDialogLoaded(true);
  }, []);

  const columns = useMemo(() => getOrdersColumns(handleViewOrder, handlePrefetch), [handleViewOrder, handlePrefetch]);

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
        columns={columns}
        data={orders}
        emptyMessage={isLoading ? "Загрузка..." : isError ? "Ошибка" : "Нет заказов"}
        serverPagination={{ page, pageCount, onPageChange }}
        fixedPageSize={10}
      />

      {isDialogLoaded && (
        <OrderEditDialog open={isDialogOpen} orderId={selectedOrderId} onOpenChange={setIsDialogOpen} />
      )}
    </div>
  );
}
