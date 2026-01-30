import * as React from "react";

import { cn } from "@/shared/lib/utils";

type StatusBadgeProps = {
  label: string;
  Icon: React.FC<{ className?: string }>;
};

export function StatusBadge({ label, Icon }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-1",
        "h-5 w-[90px]",
        "rounded-xl border",
        "bg-muted text-muted-foreground border-border",

        "text-xs font-medium",
        "whitespace-nowrap",
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 opacity-70" />
      <span className="truncate">{label}</span>
    </div>
  );
}
