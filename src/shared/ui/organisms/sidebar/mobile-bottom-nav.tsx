"use client";
import { useEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";

import type { NavGroup } from "@/features/sidebar/types/sidebar.types";
import { cn } from "@/shared/lib/utils";

export function MobileBottomNav({ items }: { items: NavGroup[] }) {
  const path = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);

  const flatItems = items.flatMap((g) => g.items);
  const bottomItems = flatItems.filter((i) => !i.comingSoon).slice(0, 5);

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

  const getBasePath = (url: string) => {
    const segments = url.split("/").filter(Boolean);
    return segments.length >= 2 ? `/${segments.slice(0, 2).join("/")}` : url;
  };

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 transition-transform duration-300 md:hidden",
        hidden && "translate-y-full",
      )}
    >
      <div className="relative mb-1 flex w-full max-w-md items-center justify-around gap-1 rounded-2xl border border-white/20 bg-white/80 px-3 py-1 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-[2px] backdrop-saturate-150">
        {bottomItems.map((item) => {
          const itemBasePath = getBasePath(item.url);
          const currentBasePath = getBasePath(path);
          const isActive =
            path === item.url ||
            currentBasePath === itemBasePath ||
            path.startsWith(item.url + "/") ||
            path.startsWith(itemBasePath + "/") ||
            item.subItems?.some(
              (s) => path === s.url || path.startsWith(s.url + "/") || currentBasePath === getBasePath(s.url),
            );

          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => router.push(item.url)}
              className={cn(
                "relative flex flex-1 items-center justify-center rounded-xl px-2 py-2.5 transition-all active:scale-95",
                isActive && "bg-gray-900/95 shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 transition-all",
                  isActive ? "scale-110 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]" : "text-gray-900",
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
