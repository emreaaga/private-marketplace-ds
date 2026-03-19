"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getOrdersColumns } from "@/entities/order/ui";
import { SessionUser, useSessionStore } from "@/entities/session";
import { DataTable } from "@/widgets/data-table/ui/data-table";
import { OrdersToolbar } from "@/widgets/orders-toolbar/ui/orders-toolbar";

const OrderEditDialog = dynamic(() => import("@/features/order-edit").then((mod) => mod.OrderEditDialog), {
  ssr: false,
});

interface OrdersTableClientProps {
  initialData: any[];
  pageCount: number;
  currentPage: number;
  user: SessionUser;
}

export function OrdersTableClient({ initialData, pageCount, currentPage, user }: OrdersTableClientProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  const setSession = useSessionStore((s) => s.setSession);
  useEffect(() => {
    if (user) {
      setSession(user);
    }
  }, [user, setSession]);

  const isAdmin = user?.company_type === "platform";

  const onPageChange = (next: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", next.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const columns = useMemo(() => getOrdersColumns(setEditId, () => import("@/features/order-edit")), []);

  return (
    <div className="space-y-4">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} canCreate={isAdmin} />

      <div className={isPending ? "opacity-70 transition-opacity" : ""}>
        <DataTable
          columns={columns}
          data={initialData}
          emptyMessage={initialData.length === 0 ? "Заказы не найдены" : undefined}
          serverPagination={{
            page: currentPage,
            pageCount,
            onPageChange,
          }}
          fixedPageSize={10}
        />
      </div>

      {editId !== null && (
        <OrderEditDialog open={true} orderId={editId} onOpenChange={(isOpen) => !isOpen && setEditId(null)} />
      )}
    </div>
  );
}
