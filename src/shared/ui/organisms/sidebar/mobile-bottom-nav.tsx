"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavGroup } from "@/features/sidebar/types/sidebar.types";
import { cn } from "@/shared/lib/utils";

export function MobileBottomNav({ items }: { items: NavGroup[] }) {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);

  const flatItems = items.flatMap((g) => g.items);
  const bottomItems = flatItems.filter((i) => !i.comingSoon).slice(0, 4);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y > lastY && y > 100) setHidden(true);
          if (y < lastY) setHidden(false);
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 md:hidden",
        "transition-transform duration-300 ease-out",
        hidden && "translate-y-full",
      )}
    >
      <div className="relative mb-1 flex w-full max-w-md items-center justify-around gap-1 rounded-2xl bg-white/15 px-3 py-1 shadow-[inset_0_0_1px_rgba(255,255,255,0.4)] shadow-black/20 backdrop-blur-md">
        {bottomItems.map((item) => {
          const isActive = path === item.url || item.subItems?.some((s) => path.startsWith(s.url));
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "relative flex flex-1 items-center justify-center rounded-xl px-2 py-2.5 transition-all duration-200 active:scale-95",
                isActive && "bg-gray-900/95 shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-all duration-200",
                  isActive ? "scale-110 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]" : "text-gray-900",
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
