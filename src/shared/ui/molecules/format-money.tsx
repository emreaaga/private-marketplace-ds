import { cn } from "@/shared/lib/utils";

export function formatMoney(amount: string | null | undefined, className?: string) {
  if (!amount || isNaN(Number(amount))) {
    return <span className="text-muted-foreground">—</span>;
  }

  const [whole, cents] = Number(amount).toFixed(2).split(".");

  return (
    <div className={cn("flex items-baseline font-normal tabular-nums", className)}>
      <span className="mr-0.5 text-[0.9em] opacity-70">$</span>

      <span>{whole}</span>

      <span className="text-[0.75em] opacity-50">.{cents}</span>
    </div>
  );
}
