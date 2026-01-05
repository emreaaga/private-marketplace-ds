import * as React from "react";

import { cn } from "@/shared/lib/utils";

interface TableBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function TableBadge({ children, className }: TableBadgeProps) {
  return (
    <span
      className={cn(
        // ЖЁСТКАЯ ФИКСАЦИЯ
        "w-[56px] max-w-[56px] min-w-[56px]",
        // НИЧТО НЕ ВЛИЯЕТ НА WIDTH
        "overflow-hidden whitespace-nowrap",
        // layout
        "inline-flex shrink-0 items-center justify-center",
        // typography
        "text-xs font-medium tabular-nums",
        // visual
        "bg-muted text-foreground rounded-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
