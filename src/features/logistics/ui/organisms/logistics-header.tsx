"use client";

import { ClipboardList, User, Plane, Send } from "lucide-react";

import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

const items = [
  { href: "/dashboard/logistics/plane", label: "Самолет", icon: Plane },
  { href: "/dashboard/logistics/shipment", label: "Отправки", icon: Send },
  { href: "/dashboard/logistics/orders", label: "Заказы", icon: ClipboardList },
  { href: "/dashboard/logistics/main", label: "Пользователи", icon: User },
];

export function LogisticsHeader() {
  return <ResponsiveTabsHeader items={items} />;
}
