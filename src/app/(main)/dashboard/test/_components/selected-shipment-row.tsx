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
    <div className="group hover:bg-muted/40 grid min-h-8 grid-cols-[40px_1fr_70px_80px_80px_32px] items-center gap-2 px-3 py-1 transition-colors">
      <div className="flex items-center justify-center">
        <span className="text-muted-foreground font-mono text-[10px] group-hover:hidden">{id}</span>
        <button
          onClick={onRemoveAction}
          className="text-muted-foreground hover:text-destructive hidden transition-colors group-hover:flex"
          type="button"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      <div className="min-w-0">
        <span className="block truncate text-[13px] leading-none">{meta?.name ?? "..."}</span>
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

      <div className="text-right">
        <span className="text-[11px] font-semibold text-orange-600 tabular-nums">
          ${Number(meta?.remaining ?? 0).toFixed(2)}
        </span>
      </div>

      <span />
    </div>
  );
}
