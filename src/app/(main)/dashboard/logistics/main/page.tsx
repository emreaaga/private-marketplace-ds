"use client";

import { useMemo } from "react";

import { fakeOrders } from "@/app/(main)/dashboard/logistics/orders/_components/fake-orders";
import { DataTable } from "@/widgets/data-table/ui/data-table";

import { getOrderColumns } from "../orders/_components/orders-table-columns";

export default function LogisticsMainPage() {
  const columns = useMemo(() => getOrderColumns(), []);

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={fakeOrders} />
    </div>
  );
}
