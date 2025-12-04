"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavGroup } from "@/features/sidebar/types/sidebar.types";
import { cn } from "@/shared/lib/utils";

export function MobileBottomNav({ items }: { items: NavGroup[] }) {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);

  const refs = useRef(new Map<number, HTMLDivElement | null>());

  const flatItems = items.flatMap((g) => g.items);
  const bottomItems = flatItems.filter((i) => !i.comingSoon).slice(0, 4);

  const computedIndex = bottomItems.findIndex(
    (item) => path === item.url || item.subItems?.some((s) => path.startsWith(s.url)),
  );

  const activeIndex = computedIndex === -1 ? 0 : computedIndex;

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 50) setHidden(true);
      if (y < lastY) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const el = refs.current.get(activeIndex);
    if (!el) return;

    const parent = el.parentElement!.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    const bubbleX = rect.left - parent.left;
    const bubbleW = rect.width;

    setBubbleStyle({
      width: `${bubbleW}px`,
      transform: `translateX(${bubbleX}px)`,
    });
  }, [activeIndex]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-4 z-50 flex justify-center md:hidden",
        hidden && "translate-y-20",
        "transition-all duration-300",
      )}
    >
      <div className="relative flex w-[90%] max-w-sm items-center justify-between rounded-full border border-gray-200 bg-white/90 px-6 py-3 shadow-xl backdrop-blur-xl">
        <div
          className={cn(
            "pointer-events-none absolute top-1/2 left-0 h-10 -translate-y-1/2 rounded-xl",
            "bg-primary/90 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          )}
          style={bubbleStyle}
        />

        {bottomItems.map((item, i) => {
          const isActive = path === item.url || item.subItems?.some((s) => path.startsWith(s.url));

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              ref={(el) => {
                refs.current.set(i, el);
              }}
              className="relative flex flex-col items-center justify-center px-4"
            >
              <Link href={item.url} className="relative flex flex-col items-center justify-center">
                <Icon
                  className={cn(
                    "relative z-10 h-6 w-6 transition-colors duration-300",
                    isActive ? "text-white" : "text-muted-foreground",
                  )}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
