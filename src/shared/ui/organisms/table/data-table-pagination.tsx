"use client";

import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";

type ExternalPagination = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

interface Props<TData> {
  table: Table<TData>;
  externalPagination?: ExternalPagination;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export function DataTablePagination<TData>({ table, externalPagination }: Props<TData>) {
  const internalPage = table.getState().pagination.pageIndex + 1;
  const internalCount = table.getPageCount();

  const page = externalPagination?.page ?? internalPage;
  const pageCount = externalPagination?.pageCount ?? internalCount;

  const canPrev = externalPagination ? page > 1 : table.getCanPreviousPage();
  const canNext = externalPagination ? page < pageCount : table.getCanNextPage();

  const goTo = (p: number) => {
    const next = clamp(p, 1, Math.max(1, pageCount));

    if (externalPagination) externalPagination.onPageChange(next);
    else table.setPageIndex(next - 1);
  };

  return (
    <div className="border-border/40 bg-background/50 flex w-full items-center justify-between backdrop-blur-sm">
      <div className="text-muted-foreground hover:text-foreground text-[13px] font-medium transition-colors">
        Страница <span className="text-foreground font-mono">{page}</span> из{" "}
        <span className="font-mono">{pageCount}</span>
        {}
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            "hover:bg-accent hover:text-accent-foreground active:scale-95 disabled:opacity-30",
          )}
          onClick={() => goTo(page - 1)}
          disabled={!canPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="bg-border/60 mx-1 h-4 w-px" />
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            "hover:bg-accent hover:text-accent-foreground active:scale-95 disabled:opacity-30",
          )}
          onClick={() => goTo(page + 1)}
          disabled={!canNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
