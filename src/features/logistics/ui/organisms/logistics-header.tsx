"use client";

import { ClipboardList, User, Plane } from "lucide-react";

import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

const items = [
  { href: "/dashboard/logistics/shipment", label: "Отправки", icon: Plane },
  { href: "/dashboard/logistics/orders", label: "Заказы", icon: ClipboardList },
  { href: "/dashboard/logistics/main", label: "Пользователи", icon: User },
];

export function LogisticsHeader() {
  return <ResponsiveTabsHeader items={items} />;
}
