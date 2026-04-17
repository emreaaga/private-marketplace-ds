"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/widgets/data-table/ui/data-table";

import { getSellersOrdersColumns } from "./_components/sellers-orders-columns";
import { fakeOrders } from "./_components/test-fake-orders";
import { Order } from "./_components/test-order";

export default function SellerOrdersPage() {
  const [orders] = useState<Order[]>(fakeOrders);
  const columns = useMemo(() => getSellersOrdersColumns(), []);

  return (
    <div className="space-y-4">
      <DataTable data={orders} columns={columns} />
    </div>
  );
}
