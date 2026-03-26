"use client";

import { X } from "lucide-react";

interface BranchSummaryRowProps {
  index: number;

  branch: {
    branch_id: number | string;
    to_city: string;
    orders_count: number | string;
    total_prepaid: number | string;
    total_remaining: number | string;
    total_weight: number | string;
    total_amount?: number | string;
  };
  onRemoveAction?: () => void;
}

export function BranchSummaryRow({ index, branch, onRemoveAction }: BranchSummaryRowProps) {
  return (
    <div className="group grid min-h-8 grid-cols-[32px_50px_1fr_50px_70px_80px_80px_32px] items-center gap-3 px-4 py-1">
      <div className="flex w-full items-center justify-center">
        <span className="font-mono text-[10px] text-zinc-400 group-hover:hidden">{index + 1}</span>
        {onRemoveAction ? (
          <button
            onClick={onRemoveAction}
            className="hidden h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-colors group-hover:flex hover:bg-red-50 hover:text-red-600"
            type="button"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <span className="hidden font-mono text-[10px] text-zinc-400 group-hover:block">{index + 1}</span>
        )}
      </div>

      <div className="flex items-center">
        <span className="font-mono text-[11px] font-bold text-zinc-600">#{branch.branch_id}</span>
      </div>

      <div className="min-w-0">
        <span className="block truncate text-[13px] font-medium text-zinc-900">{branch.to_city}</span>
      </div>

      <div className="flex items-center justify-end text-right">
        <span className="font-mono text-[12px] font-medium text-zinc-500 tabular-nums">{branch.orders_count}</span>
      </div>

      <div className="flex flex-col items-end justify-center text-right tabular-nums">
        <span className="text-[12px] leading-none font-medium text-zinc-700">
          {Number(branch.total_weight).toFixed(2)}
        </span>
      </div>

      <div className="text-right">
        <span className="text-[12px] font-medium text-zinc-700 tabular-nums">
          ${Number(branch.total_prepaid).toFixed(2)}
        </span>
      </div>

      <div className="text-right">
        <span className="text-[12px] font-medium text-orange-600 tabular-nums">
          ${Number(branch.total_remaining).toFixed(2)}
        </span>
      </div>

      <div />
    </div>
  );
}
