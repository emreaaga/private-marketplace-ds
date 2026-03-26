import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

import { FLIGHT_SHIPMENTS_GRID } from "../lib/constants";

interface FlightShipmentsHeaderProps {
  onAdd: () => void;
}

export function FlightShipmentsHeader({ onAdd }: FlightShipmentsHeaderProps) {
  return (
    <div className="border-b border-zinc-200/60 bg-zinc-50/50 px-4">
      <div className={FLIGHT_SHIPMENTS_GRID}>
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-md transition-colors hover:bg-zinc-200/50"
            onClick={onAdd}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">№</span>
        <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Фирма / Город</span>
        <span className="text-right text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Зак.</span>
        <span className="text-right text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Вес</span>
        <span className="text-right text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Взнос</span>
        <span className="text-right text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Остаток</span>
        <span />
      </div>
    </div>
  );
}
