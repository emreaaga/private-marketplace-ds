"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "@/types/users";

import { DataTableMobile } from "./data-table-mobile";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onDelete?: (id: number) => void;
    onRoleChange?: (id: number, role: User["role"]) => void;
    onStatusChange?: (id: number, status: User["status"]) => void;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete: (id: number) => void;
  onStatusChange?: (id: number, status: User["status"]) => void;
  onRoleChange?: (id: number, role: User["role"]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
  onStatusChange,
  onRoleChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { onDelete, onStatusChange, onRoleChange },
  });

  return (
    <>
      <div className="-mx-8 md:hidden">
        <DataTableMobile
          data={data as User[]}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onRoleChange={onRoleChange}
        />
      </div>

      <div className="hidden overflow-hidden rounded-md border md:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
