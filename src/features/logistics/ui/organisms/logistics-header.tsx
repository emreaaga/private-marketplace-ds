"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ClipboardList, User } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

const items = [
  {
    href: "/dashboard/logistics/orders",
    label: "Заказы",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/logistics/main",
    label: "Пользователи",
    icon: User,
  },
];

export function LogisticsHeader() {
  const pathname = usePathname();

  const activeTab = items.find((item) => pathname.startsWith(item.href))?.href ?? items[0].href;

  return (
    <Tabs value={activeTab}>
      <TabsList className="flex gap-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <TabsTrigger key={item.href} value={item.href} asChild>
              <Link href={item.href} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
