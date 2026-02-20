"use client";

import { useMemo } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Users,
  ClipboardList,
  Building2,
  Link as LinkIcon,
  Package,
  Plane,
  ShoppingCart,
  Banknote,
  LucideTextSelection,
} from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

const ICON_MAP = {
  users: Users,
  orders: ClipboardList,
  access: LinkIcon,
  shipments: Package,
  flights: Plane,
  cart: ShoppingCart,
  finance: Banknote,
  company: Building2,
  service: LucideTextSelection,
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

const normalizePath = (path: string) => {
  return path
    .split("/")
    .filter((segment) => !/^\d+$/.test(segment))
    .join("/");
};

export function ResponsiveTabsHeader({ items }: ResponsiveTabsHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = useMemo(() => {
    const normalizedCurrentPath = normalizePath(pathname);

    const matchedItem = items.find((item) => {
      const normalizedItemHref = normalizePath(item.href);
      return normalizedCurrentPath.includes(normalizedItemHref);
    });

    return matchedItem?.href ?? items[0]?.href;
  }, [pathname, items]);

  if (!activeTab) return null;

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
          <TabsList className="flex gap-2 overflow-x-auto whitespace-nowrap sm:overflow-visible">
            {items.map((item) => {
              const Icon = item.icon ? ICON_MAP[item.icon] : null;

              return (
                <TabsTrigger key={item.href} value={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2 px-3 py-2 text-sm transition-colors">
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
