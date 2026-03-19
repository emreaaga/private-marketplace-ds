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
    <div className="grid min-h-8 grid-cols-[32px_60px_1fr_80px_90px_90px_32px] items-center gap-3 px-4 py-1">
      <div className="flex w-full items-center justify-center">
        <span className="font-mono text-[10px] text-zinc-400 group-hover:hidden">{index + 1}</span>
        <button
          onClick={onRemoveAction}
          className="hidden h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors group-hover:flex hover:bg-red-50 hover:text-red-600"
          type="button"
          title="Удалить строку"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center">
        <span className="font-mono text-[11px] text-zinc-600">{id}</span>
      </div>

      <div className="min-w-0">
        <span className="block truncate text-[13px] font-medium text-zinc-900">{meta?.name ?? "..."}</span>
      </div>

      <div className="flex flex-col items-end justify-center text-right tabular-nums">
        {meta?.weightDiff && meta.weightDiff > 0.01 ? (
          <span className="mb-0.5 text-[9px] leading-none font-bold text-orange-500">
            +{meta.weightDiff.toFixed(2)}
          </span>
        ) : null}
        <span className="text-[12px] leading-none font-medium text-zinc-700">
          {Number(meta?.weight ?? 0).toFixed(2)}
        </span>
      </div>

      <div className="text-right">
        <span className="text-[12px] font-medium text-zinc-700 tabular-nums">
          ${Number(meta?.prepaid ?? 0).toFixed(2)}
        </span>
      </div>

      <div className="text-right">
        <span className="text-[12px] font-medium text-orange-600 tabular-nums">
          ${Number(meta?.remaining ?? 0).toFixed(2)}
        </span>
      </div>

      <div />
    </div>
  );
}
