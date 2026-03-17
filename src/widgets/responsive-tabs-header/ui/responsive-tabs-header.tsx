"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { cn } from "@/shared/lib/utils";

import { useTabsLogic } from "../lib/use-tabs-logic";
import { ResponsiveTabsHeaderProps } from "../model/types";

import { TabsDesktop } from "./tabs-desktop";
import { TabsMobile } from "./tabs-mobile";

export function ResponsiveTabsHeader({ items, user }: ResponsiveTabsHeaderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { visibleItems, activeTab } = useTabsLogic(items, user);

  const handleSelectChange = (value: string) => {
    startTransition(() => {
      router.push(value);
    });
  };

  if (visibleItems.length === 0 || !activeTab) return null;

  return (
    <div className={cn("w-full transition-opacity duration-200", isPending && "opacity-60")}>
      <TabsMobile items={visibleItems} activeTab={activeTab} onSelect={handleSelectChange} isPending={isPending} />
      <TabsDesktop items={visibleItems} activeTab={activeTab} />
    </div>
  );
}
