"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/ui/organisms/table/data-table";

import type { ProductRow } from "../../fake-products";

interface ProductsTableProps {
  data: ProductRow[];
  columns: ColumnDef<ProductRow, any>[];
  pageSize?: number;
}

export function ProductsTable({ data, columns, pageSize = 10 }: ProductsTableProps) {
  return <DataTable data={data} columns={columns} pageSize={pageSize} emptyMessage="Нет товаров" />;
}
