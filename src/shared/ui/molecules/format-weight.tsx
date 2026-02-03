const VARIANT_STYLES = {
  default: "text-foreground",
  warning: "text-yellow-700",
  success: "text-emerald-600",
} as const;

type WeightVariant = keyof typeof VARIANT_STYLES;

export function formatWeight(value: string | number, variant: WeightVariant = "default") {
  const num = Number(value);

  if (Number.isNaN(num)) {
    return <span className="text-muted-foreground">—</span>;
  }

  const [int, frac] = num.toFixed(2).split(".");

  return (
    <span className={`leading-none tabular-nums ${VARIANT_STYLES[variant]}`}>
      {int}
      <span className="text-xs opacity-70">.{frac}</span>
      <span className="ml-1 text-xs opacity-70">кг</span>
    </span>
  );
}
