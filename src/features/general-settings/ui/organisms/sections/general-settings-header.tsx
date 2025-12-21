"use client";

import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

const items = [{ href: "/dashboard/settings/roles", label: "Роли" }];

export function SettingsHeader() {
  return <ResponsiveTabsHeader items={items} />;
}
