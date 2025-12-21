"use client";

import { useState } from "react";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table as TableIcon } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/atoms/table";
import { DataTablePagination } from "@/shared/ui/organisms/table/data-table-pagination";

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../../atoms/empty";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  pageSize?: number;
  emptyMessage?: string;
}

export function DataTable<TData>({ columns, data, pageSize = 10, emptyMessage = "Нет данных" }: DataTableProps<TData>) {
  const [page] = useState(1);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = rows.slice((safePage - 1) * pageSize, safePage * pageSize);

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
            {paginated.length ? (
              paginated.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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

      <DataTablePagination table={table} />
    </div>
  );
}
