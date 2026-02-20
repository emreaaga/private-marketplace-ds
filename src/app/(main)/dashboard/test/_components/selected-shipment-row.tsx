"use client";

import { X } from "lucide-react";

interface SelectedShipmentRowProps {
  id: number;
  meta?: {
    name: string;
    weight: number | string | unknown;
    prepaid?: number | string | unknown;
    remaining?: number | string | unknown;
  };
  onRemoveAction: () => void;
}

export function SelectedShipmentRow({ id, meta, onRemoveAction }: SelectedShipmentRowProps) {
  return (
    <div className="group hover:bg-muted/40 grid grid-cols-[40px_1fr_70px_80px_80px_32px] items-center gap-2 px-3 py-1.5 transition-colors">
      <span className="text-muted-foreground font-mono text-[10px]">#{id}</span>

      <span className="truncate text-[13px] leading-none font-medium">{meta?.name ?? "..."}</span>

      <span className="text-right text-xs font-bold whitespace-nowrap tabular-nums">
        {Number(meta?.weight ?? 0).toFixed(1)} кг
      </span>

      <span className="text-right text-[11px] font-semibold tabular-nums">
        +{Number(meta?.prepaid ?? 0).toFixed(0)} $
      </span>

      <span className="text-right text-[11px] font-semibold tabular-nums">
        {Number(meta?.remaining ?? 0).toFixed(0)} $
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
