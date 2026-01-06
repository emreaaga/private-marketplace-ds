import { Badge } from "@/shared/ui/atoms/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

export function TableBadge({
  children,
  tooltip,
  variant = "filled",
}: {
  children: React.ReactNode;
  tooltip?: string;
  variant?: "filled" | "outline";
}) {
  const className =
    variant === "outline"
      ? "h-5 px-1.5 text-[10px] border border-slate-300 bg-background text-slate-800 leading-none font-medium whitespace-nowrap"
      : "h-5 px-1.5 text-[10px] bg-slate-500/15 text-slate-700 leading-none font-medium whitespace-nowrap";

  const badge = <Badge className={className}>{children}</Badge>;

  if (!tooltip) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent side="top">
        <span className="text-[8px] whitespace-nowrap">{tooltip}</span>
      </TooltipContent>
    </Tooltip>
  );
}
