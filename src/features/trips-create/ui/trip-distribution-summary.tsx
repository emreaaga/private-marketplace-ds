import { cn } from "@/shared/lib/utils";

interface SummaryData {
  total_orders: string;
  total_weight: string;
  total_cash: string;
}

interface TripDistributionSummaryProps {
  summary?: SummaryData;
  isFetching: boolean;
  isVisible: boolean;
}

export function TripDistributionSummary({ summary, isFetching, isVisible }: TripDistributionSummaryProps) {
  return (
    <div
      className={cn(
        "border-border/40 bg-background overflow-hidden rounded-xl border transition-opacity duration-200",
        !isVisible && "opacity-35",
      )}
    >
      <div className="border-border/30 flex items-center justify-between border-b px-3.5 py-2.5">
        <span className="text-muted-foreground/70 font-sans text-[10px] font-medium tracking-widest uppercase">
          {isFetching ? "Загрузка..." : "Груз к распределению"}
        </span>
        {isFetching && (
          <span className="bg-muted/60 text-muted-foreground/50 rounded px-1.5 py-0.5 font-mono text-[9px]">···</span>
        )}
      </div>

      <div className="grid grid-cols-3">
        <StatBox label="Заказов" value={isVisible && summary ? summary.total_orders : "—"} />
        <StatBox label="Вес" value={isVisible && summary ? `${summary.total_weight} кг` : "—"} bordered />
        <StatBox label="Сбор" value={isVisible && summary ? `$${summary.total_cash}` : "—"} bordered accent />
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  bordered,
  accent,
}: {
  label: string;
  value: string;
  bordered?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-0.5 px-3.5 py-3", bordered && "border-border/30 border-l")}>
      <span className="text-muted-foreground/50 font-sans text-[9px] font-medium tracking-widest uppercase">
        {label}
      </span>
      <span
        className={cn(
          "font-mono text-[13px] font-medium tabular-nums",
          accent ? "text-emerald-600 dark:text-emerald-400" : "text-foreground",
          value === "—" && "text-muted-foreground/30",
        )}
      >
        {value}
      </span>
    </div>
  );
}
