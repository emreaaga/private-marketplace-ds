"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Users, ClipboardList, Link as LinkIcon, Package, Plane, ShoppingCart } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

const ICON_MAP = {
  users: Users,
  orders: ClipboardList,
  access: LinkIcon,
  shipments: Package,
  flights: Plane,
  cart: ShoppingCart,
} as const;

export type HeaderIconKey = keyof typeof ICON_MAP;

export interface HeaderTabItem {
  href: string;
  label: string;
  icon?: HeaderIconKey;
}

interface ResponsiveTabsHeaderProps {
  items: readonly HeaderTabItem[];
}

export function ResponsiveTabsHeader({ items }: ResponsiveTabsHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = items.find((item) => pathname.startsWith(item.href))?.href ?? items[0]?.href;

  if (!activeTab) return null;

  return (
    <>
      <div className="sm:hidden">
        <Select value={activeTab} onValueChange={router.push}>
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
          <TabsList className="flex gap-2 overflow-x-auto whitespace-nowrap sm:overflow-visible">
            {items.map((item) => {
              const Icon = item.icon ? ICON_MAP[item.icon] : null;

              return (
                <TabsTrigger key={item.href} value={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2 px-3 py-2 text-sm">
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
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
