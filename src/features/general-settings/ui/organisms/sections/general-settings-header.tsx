"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

const items = [{ href: "/dashboard/settings/roles", label: "Роли" }];

export function SettingsHeader() {
  const pathname = usePathname();

  const activeTab = items.find((item) => pathname.startsWith(item.href))?.href ?? items[0].href;

  return (
    <Tabs value={activeTab}>
      <TabsList className="flex gap-2">
        {items.map((item) => (
          <TabsTrigger key={item.href} value={item.href} asChild>
            <Link href={item.href}>{item.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
