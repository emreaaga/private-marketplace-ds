"use client";

import dynamic from "next/dynamic";

import type { ColumnDef } from "@tanstack/react-table";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { LoadingPlaceholder } from "@/shared/ui/molecules/loading-placeholder";
import { TableSkeleton } from "@/shared/ui/molecules/table-skeleton";

import type { ProductRow } from "../../fake-products";

import { ProductsMobileList } from "./product-mobile-list";

const ProductsTable = dynamic(() => import("./products-table").then((m) => m.ProductsTable), {
  loading: () => <TableSkeleton rows={10} columns={6} />,
});

interface ProductsResponsiveProps {
  data: ProductRow[];
  columns: ColumnDef<ProductRow, any>[];
}

export function ProductsResponsive({ data, columns }: ProductsResponsiveProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <LoadingPlaceholder label="Подготовка списка товаров…" />;
  }

  if (isMobile) {
    return <ProductsMobileList data={data} />;
  }

  return <ProductsTable data={data} columns={columns} pageSize={10} />;
}
