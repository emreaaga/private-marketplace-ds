import { LucideIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

export function TableBadge({
  children,
  tooltip,
  icon: Icon,
  innerBadge,
}: {
  children: React.ReactNode;
  tooltip?: string;
  icon?: LucideIcon;
  innerBadge?: React.ReactNode;
}) {
  const content = (
    <div className="flex items-center gap-1 text-[10px] leading-none font-medium whitespace-nowrap">
      {Icon && <Icon className="h-3 w-3 shrink-0" />}

      <span>{children}</span>

      {innerBadge && <span className="ml-1 text-[8px] opacity-60">{innerBadge}</span>}
    </div>
  );

  if (!tooltip) return content;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-help">{content}</div>
      </TooltipTrigger>
      <TooltipContent side="top">
        <span className="text-[10px] whitespace-nowrap">{tooltip}</span>
      </TooltipContent>
    </Tooltip>
  );
}
