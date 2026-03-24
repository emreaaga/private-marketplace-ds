"use client";

import { useMemo } from "react";

import { DataTable } from "@/widgets/data-table/ui/data-table";

import { fakeOrders } from "../orders/_components/fake-orders";
import { getOrderColumns } from "../orders/_components/orders-table-columns";

export default function LogisticsMainPage() {
  const columns = useMemo(() => getOrderColumns(), []);

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={fakeOrders} />
    </div>
  );
}
