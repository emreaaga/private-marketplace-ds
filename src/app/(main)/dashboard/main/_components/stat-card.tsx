import { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  variant?: "default" | "warning" | "danger";
}

export function StatCard({ label, value, icon: Icon, subtitle, variant = "default" }: StatCardProps) {
  const variants = {
    default: "bg-background/60",
    warning: "bg-yellow-500/5 border-yellow-500/20",
    danger: "bg-red-500/5 border-red-500/20",
  };

  return (
    <div
      className={cn("rounded-2xl border p-4 shadow-sm backdrop-blur-md transition hover:shadow-md", variants[variant])}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-muted-foreground text-xs font-medium">{label}</span>
          <span className="mt-1 block text-xl font-semibold tracking-tight">{value}</span>
          {subtitle && <span className="text-muted-foreground mt-1 block text-[11px]">{subtitle}</span>}
        </div>

        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
