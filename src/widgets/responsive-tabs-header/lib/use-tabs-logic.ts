import { useMemo } from "react";

import { usePathname } from "next/navigation";

import { UserAuth } from "@/entities/user";
import { canAccess } from "@/shared/config/permissions";

import { HeaderTabItem } from "../model/types";

export const normalizePath = (path: string) => {
  return path
    .split("/")
    .filter((segment) => !/^\d+$/.test(segment))
    .join("/");
};

export function useTabsLogic(items: readonly HeaderTabItem[], user: UserAuth | null) {
  const pathname = usePathname() ?? "";

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

  return { visibleItems, activeTab };
}
