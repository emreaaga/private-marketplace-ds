"use client";

import { useMemo, useState } from "react";

import { fakeProducts } from "@/features/products/fake-products";
import { filterProducts, type ProductSort } from "@/features/products/lib/filter-products";
import type { Product } from "@/features/products/types/product.types";
import { useIsMobile } from "@/shared/hooks/use-mobile";

export function useProductsPageState() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState<ProductSort>("none");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);

  const isMobile = useIsMobile();

  const categories = useMemo(() => [...new Set(fakeProducts.map((p) => p.category))], []);

  const filteredProducts = useMemo(
    () =>
      filterProducts(fakeProducts, {
        search,
        category: categoryFilter,
        sort,
      }),
    [search, categoryFilter, sort],
  );

  const isEmpty = filteredProducts.length === 0;

  const openMobileProduct = (product: Product) => {
    if (!isMobile) return;
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  return {
    search,
    categoryFilter,
    sort,
    selectedProduct,
    drawerOpen,
    filtersDrawerOpen,
    categories,
    filteredProducts,
    isEmpty,
    isMobile,

    setSearch,
    setCategoryFilter,
    setSort,
    setSelectedProduct,
    setDrawerOpen,
    setFiltersDrawerOpen,

    openMobileProduct,
  };
}
