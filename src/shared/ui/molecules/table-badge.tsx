import { LucideIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/atoms/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

export function TableBadge({
  children,
  tooltip,
  variant = "filled",
  icon: Icon,
  innerBadge,
}: {
  children: React.ReactNode;
  tooltip?: string;
  variant?: "filled" | "outline";
  icon?: LucideIcon;
  innerBadge?: React.ReactNode;
}) {
  const className =
    variant === "outline"
      ? "h-5 px-1.5 text-[10px] border border-slate-300 bg-background text-slate-800 leading-none font-medium whitespace-nowrap"
      : "h-5 px-1.5 text-[10px] bg-slate-500/15 text-slate-700 leading-none font-medium whitespace-nowrap";

  const content = (
    <Badge className={cn(className, "flex items-center", Icon && "gap-1")}>
      {Icon && <Icon className="h-3 w-3 shrink-0" />}

      <span>{children}</span>

      {innerBadge && (
        <span className="ml-1 rounded border border-slate-200 bg-white px-1 py-0.5 text-[8px] leading-none font-medium text-slate-700">
          {innerBadge}
        </span>
      )}
    </Badge>
  );

  if (!tooltip) return content;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="top">
        <span className="text-[8px] whitespace-nowrap">{tooltip}</span>
      </TooltipContent>
    </Tooltip>
  );
}
