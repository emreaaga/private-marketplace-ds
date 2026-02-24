import { cn } from "@/shared/lib/utils";

const VARIANT_STYLES = {
  default: "text-foreground",
  warning: "text-yellow-600/90",
  success: "text-emerald-600",
} as const;

type WeightVariant = keyof typeof VARIANT_STYLES;

export function formatWeight(
  value: string | number | null | undefined,
  variant: WeightVariant = "default",
  className?: string,
) {
  const num = Number(value);

  if (value === null || value === undefined || Number.isNaN(num)) {
    return <span className="text-muted-foreground">—</span>;
  }

  const [int, frac] = num.toFixed(2).split(".");

  return (
    <div className={cn("flex items-baseline font-normal tabular-nums", className)}>
      <span className={cn(VARIANT_STYLES[variant])}>{int}</span>

      <span className="text-muted-foreground text-[0.75em]">.{frac}</span>

      <span className="text-muted-foreground ml-1 text-[0.7em] tracking-wider uppercase">кг</span>
    </div>
  );
}
