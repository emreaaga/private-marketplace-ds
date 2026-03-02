"use client";

import { Fragment, useMemo, useState } from "react";

import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type OnChangeFn,
  type PaginationState,
} from "@tanstack/react-table";
import { Table as TableIcon } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/atoms/table";
import { DataTablePagination } from "@/shared/ui/organisms/table/data-table-pagination";

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../../atoms/empty";

type ServerPagination = {
  /** 1-based */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  emptyMessage?: string;
  renderExpandedRow?: (row: TData) => React.ReactNode;

  serverPagination?: ServerPagination;

  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;

  hidePagination?: boolean;
  disablePageSizeSelect?: boolean;

  fixedPageSize?: number;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

// eslint-disable-next-line complexity
export function DataTable<TData>({
  columns,
  data,
  emptyMessage = "Нет данных",
  renderExpandedRow,

  serverPagination,

  pagination,
  onPaginationChange,
  pageCount,

  hidePagination = false,
  disablePageSizeSelect = false,
  fixedPageSize = 10,
}: DataTableProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const isServer = serverPagination != null;

  const paginationEnabled = isServer || (pagination != null && onPaginationChange != null && pageCount != null);

  const resolvedPageCount = isServer ? serverPagination.pageCount : pageCount;

  const resolvedPagination: PaginationState | undefined = useMemo(() => {
    if (!paginationEnabled) return undefined;

    if (isServer) {
      return {
        pageIndex: Math.max(0, serverPagination.page - 1),
        pageSize: fixedPageSize,
      };
    }

    return pagination!;
  }, [paginationEnabled, isServer, serverPagination, pagination, fixedPageSize]);

  const resolvedOnPaginationChange: OnChangeFn<PaginationState> | undefined = useMemo(() => {
    if (!paginationEnabled) return undefined;

    if (!isServer) return onPaginationChange;

    return (updater) => {
      const current = resolvedPagination!;
      const next = typeof updater === "function" ? updater(current) : updater;

      // ✅ pageSize изменения игнорируем (фиксировано 10)
      if (next.pageSize !== current.pageSize) {
        return;
      }

      const maxIndex = Math.max(0, serverPagination.pageCount - 1);
      const nextIndex = clamp(next.pageIndex, 0, maxIndex);

      serverPagination.onPageChange(nextIndex + 1); // назад в 1-based
    };
  }, [paginationEnabled, isServer, onPaginationChange, serverPagination, resolvedPagination]);

  const table = useReactTable({
    data,
    columns,

    state: {
      columnVisibility,
      ...(paginationEnabled ? { pagination: resolvedPagination } : {}),
    },

    onColumnVisibilityChange: setColumnVisibility,
    ...(paginationEnabled ? { onPaginationChange: resolvedOnPaginationChange } : {}),

    getCoreRowModel: getCoreRowModel(),

    ...(paginationEnabled
      ? {
          manualPagination: true,
          pageCount: resolvedPageCount!,
          autoResetPageIndex: false,
        }
      : {}),

    ...(renderExpandedRow && {
      getExpandedRowModel: getExpandedRowModel(),
      getRowCanExpand: () => true,
    }),
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>

                  {renderExpandedRow && row.getIsExpanded() && (
                    <TableRow className="bg-muted/40">
                      <TableCell colSpan={table.getVisibleLeafColumns().length}>
                        {renderExpandedRow(row.original)}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                  <Empty className="border border-dashed">
                    <EmptyHeader>
                      <EmptyMedia>
                        <TableIcon />
                      </EmptyMedia>
                      <EmptyTitle>{emptyMessage}</EmptyTitle>
                      <EmptyDescription>Измените фильтры или добавьте новую запись</EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!hidePagination && paginationEnabled && (
        <DataTablePagination
          table={table}
          externalPagination={
            serverPagination
              ? {
                  page: serverPagination.page,
                  pageCount: serverPagination.pageCount,
                  onPageChange: serverPagination.onPageChange,
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
