"use client";

import { useMemo, useTransition } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Building2,
  ClipboardList,
  Link as LinkIcon,
  Loader2,
  LucideTextSelection,
  Package,
  Plane,
  ShoppingCart,
  Users,
  UserSquare,
} from "lucide-react";

import { canAccess } from "@/shared/config/permissions";
import { cn } from "@/shared/lib/utils";
import { type UserAuth } from "@/shared/types/users/user.auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

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
  readonly items: readonly HeaderTabItem[];
  readonly user: UserAuth | null;
}

const normalizePath = (path: string) => {
  return path
    .split("/")
    .filter((segment) => !/^\d+$/.test(segment))
    .join("/");
};

export function ResponsiveTabsHeader({ items, user }: ResponsiveTabsHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const visibleItems = useMemo(() => {
    if (!user) return [];
    return items.filter((item) => canAccess(item.href, user));
  }, [items, user]);

  const activeTab = useMemo(() => {
    const normalizedCurrentPath = normalizePath(pathname);
    const matchedItem = visibleItems.find((item) => {
      const normalizedItemHref = normalizePath(item.href);
      return normalizedCurrentPath.includes(normalizedItemHref);
    });
    return matchedItem?.href ?? visibleItems[0]?.href;
  }, [pathname, visibleItems]);

  const handleSelectChange = (value: string) => {
    startTransition(() => {
      router.push(value);
    });
  };

  if (visibleItems.length === 0 || !activeTab) return null;

  return (
    <div className={cn("w-full transition-opacity duration-200", isPending && "opacity-60")}>
      <div className="mb-4 sm:hidden">
        <Select value={activeTab} onValueChange={handleSelectChange}>
          <SelectTrigger className="border-border/40 bg-background/50 h-10 w-full rounded-xl backdrop-blur-md">
            <div className="flex items-center gap-2">
              {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {visibleItems.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden sm:block">
        <nav className="bg-muted/50 inline-flex items-center gap-1 rounded-lg p-1">
          {visibleItems.map((item) => {
            const Icon = item.icon ? ICON_MAP[item.icon] : null;
            const isActive = activeTab === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={cn(
                  "relative flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] font-medium transition-all",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
                )}
              >
                {Icon && (
                  <Icon
                    className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-primary" : "text-muted-foreground/60")}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
