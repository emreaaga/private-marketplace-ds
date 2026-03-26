import { FLIGHT_SHIPMENTS_GRID } from "../lib/constants";
import type { UseFlightShipmentsReturn } from "../lib/use-flight-shipments";

interface FlightShipmentsFooterProps {
  totals: UseFlightShipmentsReturn["totals"];
}

export function FlightShipmentsFooter({ totals }: FlightShipmentsFooterProps) {
  return (
    <div className="border-t border-zinc-200/60 bg-zinc-50/80">
      <div className={FLIGHT_SHIPMENTS_GRID}>
        <span />
        <span />
        <div className="text-right">
          <span className="text-[10px] font-bold tracking-tight text-zinc-400 uppercase">Итого:</span>
        </div>
        <div className="text-right">
          <span className="text-[13px] font-bold text-zinc-500 tabular-nums">{totals.orders} зак</span>
        </div>
        <div className="text-right">
          <span className="text-[13px] font-bold text-zinc-900 tabular-nums">{totals.weight.toFixed(2)} кг</span>
        </div>
        <div className="text-right">
          <span className="text-[13px] font-bold text-emerald-600 tabular-nums">${totals.prepaid.toFixed(2)}</span>
        </div>
        <div className="text-right">
          <span className="text-[13px] font-bold text-orange-600 tabular-nums">${totals.remaining.toFixed(2)}</span>
        </div>
        <span />
      </div>
    </div>
  );
}
