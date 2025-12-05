import { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, subtitle, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "group bg-background/60 rounded-2xl border p-4 shadow-sm backdrop-blur-md transition hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs font-medium">{label}</span>
          <span className="mt-1 text-xl font-semibold tracking-tight">{value}</span>
          {subtitle && <span className="text-muted-foreground mt-1 text-[11px]">{subtitle}</span>}
        </div>

        <div className="bg-primary/10 text-primary group-hover:bg-primary/15 flex h-10 w-10 items-center justify-center rounded-xl transition-colors">
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}
