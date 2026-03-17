"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { useOrdersList } from "@/entities/order";
import { getOrdersColumns } from "@/entities/order/ui";
import { getClientSession } from "@/entities/session";
import { DataTable } from "@/widgets/data-table/ui/data-table";
import { OrdersToolbar } from "@/widgets/orders-toolbar/ui/orders-toolbar";

const OrderEditDialogLoader = () => import("@/features/order-edit").then((mod) => mod.OrderEditDialog);

const OrderEditDialog = dynamic(OrderEditDialogLoader, { ssr: false });

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function OrdersPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const user = useMemo(() => getClientSession(), []);
  const isAdmin = user?.company_type === "platform";

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

  const prefetchEditDialog = () => {
    OrderEditDialogLoader();
  };

  const columns = useMemo(() => getOrdersColumns(setEditId, prefetchEditDialog), []);

  return (
    <div className="space-y-4">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} canCreate={isAdmin} />

      <DataTable
        columns={columns}
        data={orders}
        emptyMessage={emptyMessage}
        serverPagination={{ page, pageCount, onPageChange }}
        fixedPageSize={10}
      />

      {editId !== null && (
        <OrderEditDialog open={true} orderId={editId} onOpenChange={(isOpen) => !isOpen && setEditId(null)} />
      )}
    </div>
  );
}
