import { ChevronDown, MapPin, X } from "lucide-react";

import { FlightCityDistribution } from "@/entities/flight";
import { cn } from "@/shared/lib/utils";

interface Stop {
  id: string;
  code: string;
}

interface StopRowProps {
  stop: Stop;
  index: number;
  isLast: boolean;
  isActive: boolean;
  showLine: boolean;
  canRemove: boolean;
  availableCities: FlightCityDistribution[];
  selectedCodes: string[];
  onRemove: () => void;
  onUpdate: (code: string) => void;
}

export function StopRow({
  stop,
  index,
  isLast,
  isActive,
  showLine,
  canRemove,
  availableCities,
  selectedCodes,
  onRemove,
  onUpdate,
}: StopRowProps) {
  const filteredCities = availableCities.filter(
    (city) => !selectedCodes.includes(city.code.toUpperCase()) || city.code.toUpperCase() === stop.code,
  );

  return (
    <div className="group flex items-center gap-2 px-3.5 py-1.5">
      <div className="relative flex shrink-0 items-center justify-center">
        {showLine && <div className="bg-border/40 absolute top-1/2 left-1/2 z-0 h-8 w-px -translate-x-1/2" />}
        <div
          className={cn(
            "relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-sans text-[9px] font-medium transition-all duration-150",
            isActive
              ? "border-border/60 bg-background text-foreground border"
              : "border-border/30 bg-muted/40 text-muted-foreground/40 border",
          )}
        >
          {isLast ? <MapPin size={9} strokeWidth={1.6} /> : <span>{index + 1}</span>}
        </div>
      </div>

      <div className="relative flex-1">
        <select
          value={stop.code}
          onChange={(e) => onUpdate(e.target.value)}
          className={cn(
            "h-7 w-full appearance-none pr-8 pl-2 font-mono text-[10px]",
            "bg-muted/30 border-border/30 rounded-md border",
            "text-foreground focus:ring-border/60 focus:ring-1 focus:outline-none",
            "hover:border-border/50 hover:bg-muted/50 transition-colors duration-100",
            "cursor-pointer",
            !stop.code && "text-muted-foreground/40",
          )}
        >
          <option value="" disabled>
            ВЫБЕРИТЕ ГОРОД
          </option>
          {filteredCities.map((city) => (
            <option key={city.branch_id} value={city.code.toUpperCase()}>
              {`${city.code.toUpperCase()} [${city.count}шт | ${city.weight}кг | ${city.cash}$]`}
            </option>
          ))}
        </select>
        <ChevronDown
          size={10}
          className="text-muted-foreground/40 pointer-events-none absolute top-1/2 right-2 -translate-y-1/2"
        />
      </div>

      <div className="flex w-5 shrink-0 items-center justify-center">
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-muted-foreground/30 hover:text-destructive opacity-0 transition-all group-hover:opacity-100"
          >
            <X size={11} />
          </button>
        )}
      </div>
    </div>
  );
}
