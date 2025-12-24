"use client";
import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavGroup } from "@/features/sidebar/types/sidebar.types";
import { cn } from "@/shared/lib/utils";

interface MobileBottomNavProps {
  items: NavGroup[];
}

export default function MobileBottomNav({ items }: MobileBottomNavProps) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  const bottomItems = useMemo(() => {
    return items
      .flatMap((g) => g.items)
      .filter((i) => !i.comingSoon)
      .slice(0, 5);
  }, [items]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY && y > 100 && !hidden) {
          setHidden(true);
        }
        if (y < lastY && hidden) {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  const getBasePath = (url: string) => {
    const segments = url.split("/").filter(Boolean);
    return segments.length >= 2 ? `/${segments.slice(0, 2).join("/")}` : url;
  };

  return (
    <nav
      className={cn("fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 md:hidden", hidden && "translate-y-full")}
    >
      <div
        className={cn(
          "mb-1 flex w-full max-w-md items-center justify-around gap-1",
          "rounded-2xl border border-white/20",
          "bg-white/90",
          "px-3 py-1 shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
        )}
      >
        {bottomItems.map((item) => {
          const itemBasePath = getBasePath(item.url);
          const currentBasePath = getBasePath(pathname);
          const isActive =
            pathname === item.url ||
            currentBasePath === itemBasePath ||
            pathname.startsWith(item.url + "/") ||
            pathname.startsWith(itemBasePath + "/") ||
            item.subItems?.some(
              (s) => pathname === s.url || pathname.startsWith(s.url + "/") || currentBasePath === getBasePath(s.url),
            );

          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.url}
              prefetch={true}
              className={cn(
                "flex flex-1 items-center justify-center",
                "rounded-xl px-4 py-3",
                isActive && "bg-gray-900/95 shadow-md",
              )}
            >
              <Icon
                className={cn("h-6 w-6", isActive ? "text-white" : "text-gray-900")}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
