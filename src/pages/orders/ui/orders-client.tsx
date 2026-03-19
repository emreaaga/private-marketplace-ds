"use client";

import dynamic from "next/dynamic";

import { SessionUser } from "@/entities/session";

const OrdersPage = dynamic(() => import("./orders-page"), {
  ssr: false,
  loading: () => <div className="p-8 text-zinc-500 italic">Загрузка интерфейса...</div>,
});

export default function OrdersClient({ user }: { user: SessionUser }) {
  return <OrdersPage initialUser={user} />;
}
