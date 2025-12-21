"use client";

import { Users, ClipboardList, Link as LinkIcon } from "lucide-react";

import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

const items = [
  {
    href: "/dashboard/clients/orders",
    label: "Заказы",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/clients/main",
    label: "Клиенты",
    icon: Users,
  },
  {
    href: "/dashboard/clients/access",
    label: "Доступ",
    icon: LinkIcon,
  },
];
export function ClientsHeader() {
  return <ResponsiveTabsHeader items={items} />;
}
