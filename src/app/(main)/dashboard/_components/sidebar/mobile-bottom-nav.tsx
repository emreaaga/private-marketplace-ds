"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { NavGroup } from "@/navigation/sidebar/sidebar-items";

export function MobileBottomNav({ items }: { items: NavGroup[] }) {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY && currentY > 50) {
        setHidden(true);
      }

      if (currentY < lastY) {
        setHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const flatItems = items.flatMap((group) => group.items);

  const bottomItems = flatItems.filter((item) => !item.comingSoon).slice(0, 4);

  return (
    <nav
      className={cn(
        "bg-background/80 fixed inset-x-0 bottom-0 z-40 border-t backdrop-blur-md transition-transform duration-300 md:hidden",
        hidden ? "translate-y-full" : "translate-y-0",
      )}
    >
      <div className="flex items-stretch justify-around">
        {bottomItems.map((item) => {
          const isActive = path === item.url || item.subItems?.some((sub) => path.startsWith(sub.url));

          return (
            <Link
              prefetch={false}
              key={item.title}
              href={item.url}
              target={item.newTab ? "_blank" : undefined}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs"
            >
              {item.icon && (
                <item.icon
                  className={cn("h-5 w-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground")}
                />
              )}
              <span className={cn("truncate transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
