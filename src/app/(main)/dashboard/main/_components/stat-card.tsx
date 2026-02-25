import { ReactNode } from "react";

import { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/atoms/skeleton";

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon: LucideIcon;
  subtitle?: string;
  variant?: "default" | "warning" | "danger";
  isLoading?: boolean;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  subtitle,
  variant = "default",
  isLoading = false,
}: StatCardProps) {
  const variants = {
    default: "bg-background/60",
    warning: "bg-yellow-500/5 border-yellow-500/20",
    danger: "bg-red-500/5 border-red-500/20",
  };

  return (
    <div
      className={cn(
        "flex h-24 flex-col justify-center rounded-2xl border p-4 shadow-sm backdrop-blur-md transition hover:shadow-md",
        variants[variant],
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-1">
          <span className="text-muted-foreground block text-xs font-medium">{label}</span>

          {isLoading ? (
            <Skeleton className="h-7 w-20 rounded-md" />
          ) : (
            <span className="block text-xl tracking-tight">{value}</span>
          )}

          {subtitle &&
            (isLoading ? (
              <Skeleton className="mt-1 h-3 w-16 rounded-sm" />
            ) : (
              <span className="text-muted-foreground block text-[11px]">{subtitle}</span>
            ))}
        </div>

        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
