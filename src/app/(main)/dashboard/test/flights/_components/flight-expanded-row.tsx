import type { Flight } from "@/shared/types/flight/flight.model";

interface FlightExpandedRowProps {
  row: Flight;
}

export function FlightExpandedRow({ row }: FlightExpandedRowProps) {
  return (
    <div className="bg-muted/5 w-full">
      <div className="text-muted-foreground flex w-full items-center justify-between py-2.5 text-xs">
        <div className="flex gap-4">
          <div className="flex gap-1.5">
            <span>отп:</span>
            <span className="text-foreground">-</span>
          </div>
          <div className="flex gap-1.5">
            <span>пол:</span>
            <span className="text-foreground">-</span>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex gap-1.5">
            <span>заказов:</span>
            <span className="text-foreground">0</span>
          </div>
          <div className="flex gap-1.5">
            <span>доставлено:</span>
            <span className="text-foreground">0</span>
          </div>
          <div className="flex gap-1.5">
            <span>c проблемой:</span>
            <span className="text-foreground">0</span>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex gap-1.5">
            <span>погрузка:</span>
            <span className="text-foreground">{new Date(row.arrival_at).toLocaleDateString("ru-RU")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
