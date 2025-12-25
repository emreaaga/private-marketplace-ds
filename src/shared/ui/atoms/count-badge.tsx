type CountBadgeProps = {
  value: number;
};

export function CountBadge({ value }: CountBadgeProps) {
  return (
    <span className="bg-muted text-muted-foreground tabular-nims inline-flex items-center justify-center rounded-md px-0.5 py-0.5 text-xs font-medium">
      {value} р.
    </span>
  );
}
