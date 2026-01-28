export function formatMoney(value: number) {
  const [int, frac = "00"] = value.toFixed(2).split(".");

  return (
    <span className="tabular-nums">
      {int}
      <span className="text-muted-foreground ml-1 text-xs">$</span>
    </span>
  );
}

export function formatWeight(value: number) {
  const [int, frac] = value.toFixed(2).split(".");

  return (
    <span className="tabular-nums">
      {int}
      <span className="text-muted-foreground text-xs">.{frac}</span>
      <span className="text-muted-foreground ml-1 text-xs">кг</span>
    </span>
  );
}
