import { cn } from "@/shared/lib/utils";

import { CountryFlag } from "./country-flag";
import { Flight } from "./types";

const STATUS_MAP = {
  confirmed: {
    label: "Подтверждён",
    className: "bg-green-500/10 text-green-700 dark:text-green-400",
  },
  planned: {
    label: "Планируется",
    className: "bg-yellow-500/10 text-yellow-800 dark:text-yellow-400",
  },
  cancelled: {
    label: "Отменён",
    className: "bg-red-500/10 text-red-700 dark:text-red-400",
  },
};

interface Props {
  flight: Flight;
  highlighted?: boolean;
}

export function FlightCard({ flight, highlighted }: Props) {
  const status = STATUS_MAP[flight.status];

  return (
    <div
      className={cn(
        "border-border bg-card text-foreground flex items-center justify-between rounded-lg border px-4 py-3 text-sm",
        highlighted && "border-primary/60 bg-primary/5",
      )}
    >
      <div className="flex items-center gap-4 font-medium">
        <div className="flex items-center gap-2 text-base">
          <CountryFlag code={flight.fromCountryCode} />
          <span>{flight.fromCode}</span>
        </div>

        <span className="text-muted-foreground">→</span>

        <div className="flex items-center gap-2 text-base">
          <CountryFlag code={flight.toCountryCode} />
          <span>{flight.toCode}</span>
        </div>
      </div>

      <div className="text-muted-foreground flex items-center gap-6">
        <span>{flight.date}</span>
        <span>{flight.departureTime}</span>
        <span>
          Приём до <strong className="text-foreground">{flight.cutoffTime}</strong>
        </span>
      </div>

      <span className={cn("rounded px-2 py-0.5 text-xs font-medium", status.className)}>{status.label}</span>
    </div>
  );
}
