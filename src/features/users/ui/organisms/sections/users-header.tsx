"use client";

import { User } from "lucide-react";

import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

const items = [
  {
    href: "/dashboard/users/main",
    label: "Пользователи",
    icon: User,
  },
];

export function UsersHeader() {
  return <ResponsiveTabsHeader items={items} />;
}
