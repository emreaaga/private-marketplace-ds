"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/widgets/data-table/ui/data-table";

import { fakeOrders } from "./_components/fake-seller-orders";
import { Order } from "./_components/orders.type";
import { getSellersOrdersColumns } from "./_components/sellers-orders-columns";

export default function SellerOrdersPage() {
  const [orders] = useState<Order[]>(fakeOrders);
  const columns = useMemo(() => getSellersOrdersColumns(), []);

  return (
    <div className="space-y-4">
      <DataTable data={orders} columns={columns} />
    </div>
  );
}
