"use client";

import { X } from "lucide-react";

interface SelectedShipmentRowProps {
  index: number;
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

export function SelectedShipmentRow({ index, id, meta, onRemoveAction }: SelectedShipmentRowProps) {
  return (
    <div className="group hover:bg-muted/40 grid min-h-8 grid-cols-[30px_60px_1fr_70px_80px_80px] items-center gap-2 px-3 py-1 transition-colors">
      <div className="flex w-full items-center justify-center">
        <span className="text-muted-foreground/50 font-mono text-[10px] group-hover:hidden">{index + 1}</span>
        <button
          onClick={onRemoveAction}
          className="text-muted-foreground hover:text-destructive hidden transition-colors group-hover:flex"
          type="button"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center">
        <span className="font-mono text-[11px]">{id}</span>
      </div>

      <div className="min-w-0">
        <span className="block truncate text-[13px] leading-none font-medium">{meta?.name ?? "..."}</span>
      </div>

      <div className="flex flex-col items-end justify-center tabular-nums">
        {meta?.weightDiff && meta.weightDiff > 0.01 ? (
          <span className="mb-0.5 text-[9px] leading-none font-bold text-orange-500">
            +{meta.weightDiff.toFixed(2)}
          </span>
        ) : null}
        <span className="text-[11px] leading-none">{Number(meta?.weight ?? 0).toFixed(2)} кг</span>
      </div>

      <div className="text-right">
        <span className="text-[11px] font-semibold tabular-nums">${Number(meta?.prepaid ?? 0).toFixed(2)}</span>
      </div>

      <div className="pr-1 text-right">
        <span className="text-[11px] font-semibold text-orange-600 tabular-nums">
          ${Number(meta?.remaining ?? 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
