import { ReactNode } from "react";

import { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { Skeleton } from "../atoms/skeleton";

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon: LucideIcon;
  subtitle?: string;
  variant?: "default" | "warning" | "danger" | "success";
  isLoading?: boolean;
}

const variantStyles = {
  default: {
    card: "border-border bg-background",
    icon: "bg-muted text-muted-foreground",
  },
  warning: {
    card: "border-yellow-200/60 bg-yellow-50/40 dark:border-yellow-900/30 dark:bg-yellow-950/20",
    icon: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  danger: {
    card: "border-red-200/60 bg-red-50/40 dark:border-red-900/30 dark:bg-red-950/20",
    icon: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  success: {
    card: "border-green-200/60 bg-green-50/40 dark:border-green-900/30 dark:bg-green-950/20",
    icon: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  subtitle,
  variant = "default",
  isLoading = false,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn("flex flex-col gap-3 rounded-lg border p-4 transition-colors", styles.card)}>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium tracking-wide">{label}</span>
        <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-md", styles.icon)}>
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        {isLoading ? (
          <Skeleton className="h-6 w-24 rounded-md" />
        ) : (
          <span className="text-foreground text-xl font-semibold tracking-tight tabular-nums">{value}</span>
        )}

        {subtitle &&
          (isLoading ? (
            <Skeleton className="h-3 w-16 rounded-sm" />
          ) : (
            <span className="text-muted-foreground text-[11px] leading-none">{subtitle}</span>
          ))}
      </div>
    </div>
  );
}
