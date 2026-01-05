"use client";

import { useMemo } from "react";

import type { Order } from "@/features/orders/types/order.types";
import { getOrderColumns } from "@/features/orders/ui/molecules/orders-table-columns";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

interface OrdersListDesktopProps {
  orders: Order[];
  onOpenDetails: (order: Order) => void;
}

export function OrdersListDesktop({ orders, onOpenDetails }: OrdersListDesktopProps) {
  const columns = useMemo(() => getOrderColumns(), [onOpenDetails]);

  return <DataTable columns={columns} data={orders} pageSize={10} />;
}
