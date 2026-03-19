"use client";

import { useEffect, useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { useOrdersList } from "@/entities/order";
import { getOrdersColumns } from "@/entities/order/ui";
import { SessionUser, useSessionStore } from "@/entities/session";
import { DataTable } from "@/widgets/data-table/ui/data-table";
import { OrdersToolbar } from "@/widgets/orders-toolbar/ui/orders-toolbar";

const OrderEditDialog = dynamic(() => import("@/features/order-edit").then((mod) => mod.OrderEditDialog), {
  ssr: false,
});

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

interface OrdersPageProps {
  initialUser: SessionUser;
}

export default function OrdersPage({ initialUser }: OrdersPageProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const setSession = useSessionStore((s) => s.setSession);

  useEffect(() => {
    if (initialUser) {
      setSession(initialUser);
    }
  }, [initialUser, setSession]);

  const { data, isLoading, isError } = useOrdersList({ page });

  const columns = useMemo(() => getOrdersColumns(setEditId, () => import("@/features/order-edit")), []);

  if (!initialUser) {
    return null;
  }

  const isAdmin = initialUser?.company_type === "platform";
  const orders = data?.data ?? [];
  const pageCount = data?.pagination?.totalPages ?? 1;
  const emptyMessage = isLoading ? "Загрузка..." : isError ? "Ошибка загрузки" : "Заказы не найдены";

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  return (
    <div className="space-y-4">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} canCreate={isAdmin} />

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
        <OrderEditDialog open={true} orderId={editId} onOpenChange={(isOpen) => !isOpen && setEditId(null)} />
      )}
    </div>
  );
}
