"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { StoreIcon, ClipboardList, Link as LinkIcon } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

const items = [
  {
    href: "/dashboard/clients/orders",
    label: "Заказы",
    icon: StoreIcon,
  },
  {
    href: "/dashboard/clients/main",
    label: "Клиенты",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/clients/access",
    label: "Доступ",
    icon: LinkIcon,
  },
];
export function ClientsHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = items.find((item) => pathname.startsWith(item.href))?.href ?? items[0].href;
  return (
    <>
      <div className="sm:hidden">
        <Select value={activeTab} onValueChange={(value) => router.push(value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden sm:block">
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
      </div>
    </>
  );
}
