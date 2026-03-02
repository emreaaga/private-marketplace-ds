"use client";

import { useMemo } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Building2,
  ClipboardList,
  Link as LinkIcon,
  LucideTextSelection,
  Package,
  Plane,
  ShoppingCart,
  Users,
  UserSquare,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
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
  outbound: ArrowUpRight,
  inbound: ArrowDownLeft,
  clients: UserSquare,
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
    <div className="w-full">
      <div className="mb-4 sm:hidden">
        <Select value={activeTab} onValueChange={(value) => router.push(value)}>
          <SelectTrigger className="border-border/40 bg-background/50 h-10 w-full rounded-xl backdrop-blur-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href} className="rounded-lg text-sm">
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden sm:block">
        <Tabs value={activeTab} className="w-full">
          <TabsList className="bg-muted/40 inline-flex h-10 items-center justify-start gap-1 rounded-xl p-1">
            {items.map((item) => {
              const Icon = item.icon ? ICON_MAP[item.icon] : null;
              const isActive = activeTab === item.href;

              return (
                <TabsTrigger
                  key={item.href}
                  value={item.href}
                  asChild
                  className={cn(
                    "h-8 rounded-lg px-4 text-[13px] font-medium shadow-none transition-all duration-200",
                    "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                    "hover:text-foreground/80 hover:bg-background/40 data-[state=active]:hover:bg-background",
                  )}
                >
                  <Link href={item.href} prefetch={false} className="flex items-center gap-2">
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground/50",
                        )}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
