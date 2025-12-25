"use client";

import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

const items = [
  { href: "/dashboard/settings/roles", label: "Роли" },
  { href: "/dashboard/settings/categories", label: "Категории" },
];

export function SettingsHeader() {
  return <ResponsiveTabsHeader items={items} />;
}
