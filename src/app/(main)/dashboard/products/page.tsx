"use client";

import { useProductsPageState } from "@/features/products/model/use-products-page-state";
import { ProductViewDrawer } from "@/features/products/ui/organisms/product-view-drawer";
import { ProductsFiltersDrawer } from "@/features/products/ui/organisms/products-filters-drawer";
import { ProductsContentSection } from "@/features/products/ui/organisms/sections/products-content-section";
import { ProductsHeaderSection } from "@/features/products/ui/organisms/sections/products-header-section";
import { ProductsToolbarSection } from "@/features/products/ui/organisms/sections/products-toolbar-section";
import { Tabs } from "@/shared/ui/atoms/tabs";

export default function ProductsPage() {
  const {
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
    setDrawerOpen,
    setFiltersDrawerOpen,
    openMobileProduct,
  } = useProductsPageState();

  const handleCreateProduct = (data: any) => {
    console.log("create product", data);
  };

  return (
    <>
      <Tabs defaultValue="grid" className="mx-auto max-w-6xl py-10">
        <ProductsHeaderSection onCreate={handleCreateProduct} />

        <ProductsToolbarSection
          search={search}
          categoryFilter={categoryFilter}
          sort={sort}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategoryFilter}
          onSortChange={(v) => setSort(v)}
          onOpenFilters={() => setFiltersDrawerOpen(true)}
        />

        <ProductsContentSection
          isEmpty={isEmpty}
          products={filteredProducts}
          isMobile={!!isMobile}
          onOpenMobileProduct={openMobileProduct}
        />
      </Tabs>

      <ProductViewDrawer open={drawerOpen} onOpenChange={setDrawerOpen} product={selectedProduct} />

      <ProductsFiltersDrawer
        open={filtersDrawerOpen}
        onOpenChange={setFiltersDrawerOpen}
        category={categoryFilter}
        sort={sort}
        categories={categories}
        onChangeCategory={setCategoryFilter}
        onChangeSort={(v) => setSort(v)}
      />
    </>
  );
}
