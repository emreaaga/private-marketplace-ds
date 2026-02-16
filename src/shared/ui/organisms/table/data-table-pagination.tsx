"use client";

import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

type ExternalPagination = {
  /** 1-based */
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
    <div className="flex w-full items-center justify-between px-2 py-2">
      <div className="flex items-center gap-2">
        <Button variant="outline" className="h-8 w-8" onClick={() => goTo(page - 1)} disabled={!canPrev}>
          <ChevronLeft />
        </Button>

        <div className="text-muted-foreground text-sm font-medium">
          {page} из {pageCount}
        </div>

        <Button variant="outline" className="h-8 w-8" onClick={() => goTo(page + 1)} disabled={!canNext}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
