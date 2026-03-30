import { FlightSelect } from "@/entities/flight";

interface TripFlightSectionProps {
  selectedFlightId: number | null;
  onFlightChange: (id: number | null) => void;
  distributionData?: { code: string; count: string }[];
}

export function TripFlightSection({ selectedFlightId, onFlightChange, distributionData }: TripFlightSectionProps) {
  return (
    <div className="space-y-2">
      <FlightSelect value={selectedFlightId} onChange={onFlightChange} />

      {distributionData && distributionData.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-1 px-1">
          <p className="text-muted-foreground text-[10px] font-medium tracking-tight uppercase">
            {" "}
            <span className="text-foreground-muted">
              {distributionData.map((d) => `${d.code.toUpperCase()} (${d.count})`).join(", ")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
