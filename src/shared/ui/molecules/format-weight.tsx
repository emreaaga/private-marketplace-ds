export function formatWeight(value: string | number) {
  const num = Number(value);

  if (Number.isNaN(num)) {
    return <span className="text-muted-foreground">—</span>;
  }

  const [int, frac] = num.toFixed(2).split(".");

  return (
    <span className="leading-none tabular-nums">
      {int}
      <span className="text-muted-foreground text-xs">.{frac}</span>
      <span className="text-muted-foreground ml-1 text-xs">кг</span>
    </span>
  );
}
