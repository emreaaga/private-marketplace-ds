"use client";
import { useMemo } from "react";

import { getSellersOrdersColumns } from "../orders/_components/sellers-orders-columns";
import SellersOrdersResponsive from "../orders/_components/sellers-orders-responsive";

import { fakeOrders } from "./_components/fake-orders";

export default function LogisticsMainPage() {
  const columns = useMemo(() => getSellersOrdersColumns(), []);
  return <SellersOrdersResponsive data={fakeOrders} columns={columns} />;
}
