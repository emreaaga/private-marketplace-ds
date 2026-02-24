"use client";

import { X } from "lucide-react";

interface SelectedShipmentRowProps {
  id: number;
  meta?: {
    name: string;
    weight: number | string | unknown;
    weightDiff?: number;
    prepaid?: number | string | unknown;
    remaining?: number | string | unknown;
  };
  onRemoveAction: () => void;
}

// eslint-disable-next-line complexity
export function SelectedShipmentRow({ id, meta, onRemoveAction }: SelectedShipmentRowProps) {
  return (
    <div className="group hover:bg-muted/40 grid grid-cols-[40px_1fr_70px_80px_80px_32px] items-center gap-2 px-3 py-1.5 transition-colors">
      <span className="text-muted-foreground font-mono text-[10px]">{id}</span>

      <span className="truncate text-[13px] leading-none">{meta?.name ?? "..."}</span>

      <div className="flex flex-col items-end justify-center text-right whitespace-nowrap tabular-nums">
        {meta?.weightDiff && meta.weightDiff > 0.01 ? (
          <span className="animate-in fade-in slide-in-from-bottom-1 mb-0.5 text-[9px] leading-none font-bold text-orange-500">
            +{meta.weightDiff.toFixed(2)}
          </span>
        ) : null}

        <span className="text-xs">{Number(meta?.weight ?? 0).toFixed(2)} кг</span>
      </div>

      <span className="text-right text-[11px] font-semibold tabular-nums">
        {Number(meta?.prepaid ?? 0).toFixed(2)} $
      </span>

      <span className="text-right text-[11px] font-semibold tabular-nums">
        {Number(meta?.remaining ?? 0).toFixed(2)} $
      </span>

      <div className="flex justify-end">
        <button
          onClick={onRemoveAction}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded p-1 transition-all"
          type="button"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
