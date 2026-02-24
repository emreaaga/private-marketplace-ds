import { cn } from "@/shared/lib/utils";

export function formatMoney(amount: string | null | undefined, className?: string) {
  if (!amount || isNaN(Number(amount))) {
    return <span className="text-muted-foreground">—</span>;
  }

  const [whole, cents] = Number(amount).toFixed(2).split(".");

  return (
    <div className={cn("flex items-baseline font-normal tabular-nums", className)}>
      <span className="text-muted-foreground mr-0.5 text-[0.9em]">$</span>

      <span className="text-foreground">{whole}</span>

      <span className="text-muted-foreground text-[0.75em]">.{cents}</span>
    </div>
  );
}
