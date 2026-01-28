"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

interface Props {
  table: any;
}

export function DataTablePagination({ table }: Props) {
  return (
    <div className="flex w-full items-center justify-between px-2 py-2">
      <div className="hidden items-center gap-2 lg:flex">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => table.setPageSize(Number(value))}
          disabled
        >
          <SelectTrigger size="sm" className="w-20">
            <SelectValue />
          </SelectTrigger>

          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>
        <div className="text-muted-foreground text-sm font-medium">
          {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          className="h-8 w-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
