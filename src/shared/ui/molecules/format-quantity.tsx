type FormatQuantityProps = {
  unit?: string;
};

export function formatQuantity(value: string | number, { unit = "шт" }: FormatQuantityProps = {}) {
  const num = Number(value);

  if (!Number.isInteger(num)) {
    return <span className="text-destructive">invalid</span>;
  }

  return (
    <span className="leading-none tabular-nums">
      {num}
      <span className="text-muted-foreground ml-1 text-xs">{unit}</span>
    </span>
  );
}
