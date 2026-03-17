"use client";

import Link from "next/link";

import { cn } from "@/shared/lib/utils";

import { ICON_MAP } from "../model/icon-map";
import { HeaderTabItem } from "../model/types";

interface TabsDesktopProps {
  items: HeaderTabItem[];
  activeTab: string;
}

export function TabsDesktop({ items, activeTab }: TabsDesktopProps) {
  return (
    <div className="hidden sm:block">
      <nav className="bg-muted/50 inline-flex items-center gap-1 rounded-lg p-1">
        {items.map((item) => {
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
  );
}
