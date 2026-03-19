"use client";

import dynamic from "next/dynamic";

export const OrdersPage = dynamic(() => import("./ui/orders-page"), {
  ssr: false,

  loading: () => (
    <div className="flex h-32 items-center justify-center text-zinc-400 italic">Загрузка интерфейса заказов...</div>
  ),
});

export default OrdersPage;
