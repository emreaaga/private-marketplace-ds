"use client";

import { useMemo, useState } from "react";

import { Search, Package, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

import { fakeProducts, type Product } from "../../../../data/fake-products";

import { CreateProductDialog } from "./_components/create-product-dialog";
import { ProductViewDrawer } from "./_components/product-view-drawer";
import { ProductsFiltersDrawer } from "./_components/products-filters-drawer";
import { ProductsGrid } from "./_components/products-grid";
import { ProductsTable } from "./_components/products-table";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState("none");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);

  const isMobile = useIsMobile();

  const categories = [...new Set(fakeProducts.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let data = [...fakeProducts];

    if (search.trim()) {
      data = data.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (categoryFilter !== "all") {
      data = data.filter((p) => p.category === categoryFilter);
    }

    if (sort === "price_asc") data.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") data.sort((a, b) => b.price - a.price);
    if (sort === "qty_asc") data.sort((a, b) => a.quantity - b.quantity);
    if (sort === "qty_desc") data.sort((a, b) => b.quantity - a.quantity);

    return data;
  }, [search, categoryFilter, sort]);

  const isEmpty = filteredProducts.length === 0;

  const handleOpenMobileProduct = (product: Product) => {
    if (!isMobile) return;
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const handleCreateProduct = (data: any) => {
    // пока просто лог, потом подключишь API
    console.log("create product", data);
  };

  return (
    <>
      <Tabs defaultValue="grid" className="mx-auto max-w-6xl py-10">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Продукты</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Каталог оптовых товаров. Управляй позициями, ценами и публикацией.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-4">
            <TabsList className="grid w-full grid-cols-2 md:w-[220px]">
              <TabsTrigger value="grid">Карточки</TabsTrigger>
              <TabsTrigger value="table">Таблица</TabsTrigger>
            </TabsList>

            <CreateProductDialog buttonClassName="w-full md:w-auto" onCreate={handleCreateProduct} />
          </div>
        </div>

        {/* FILTERS */}
        <div className="mt-6 space-y-3 md:flex md:items-center md:justify-between md:space-y-0">
          {/* SEARCH */}
          <div className="flex w-full items-center gap-2">
            <Search className="text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Поиск по названию..."
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* DESKTOP FILTERS */}
          <div className="hidden gap-3 md:flex">
            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={(v) => setSort(v)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без сортировки</SelectItem>
                <SelectItem value="price_asc">Цена ↑</SelectItem>
                <SelectItem value="price_desc">Цена ↓</SelectItem>
                <SelectItem value="qty_asc">Кол-во ↑</SelectItem>
                <SelectItem value="qty_desc">Кол-во ↓</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* MOBILE FILTER BUTTON */}
          <Button
            type="button"
            variant="outline"
            className="flex w-full items-center justify-center gap-2 md:hidden"
            onClick={() => setFiltersDrawerOpen(true)}
          >
            <Filter className="h-4 w-4" />
            <span>Фильтры</span>
          </Button>
        </div>

        {/* EMPTY STATE */}
        {isEmpty && (
          <div className="mt-14 flex flex-col items-center gap-3 text-center">
            <Package className="text-muted-foreground h-16 w-16" />
            <h3 className="text-xl font-semibold">Нет товаров</h3>
            <p className="text-muted-foreground max-w-sm text-sm">Попробуй изменить фильтры или добавь первый товар.</p>
          </div>
        )}

        {!isEmpty && (
          <>
            {/* GRID VIEW */}
            <TabsContent value="grid" className="mt-8">
              <ProductsGrid
                products={filteredProducts}
                isMobile={isMobile}
                onOpenMobileProduct={handleOpenMobileProduct}
              />
            </TabsContent>

            {/* TABLE VIEW */}
            <TabsContent value="table" className="mt-8">
              <ProductsTable products={filteredProducts} />
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* Drawer просмотра продукта (мобилка) */}
      <ProductViewDrawer open={drawerOpen} onOpenChange={setDrawerOpen} product={selectedProduct} />

      {/* Drawer фильтров (мобилка) */}
      <ProductsFiltersDrawer
        open={filtersDrawerOpen}
        onOpenChange={setFiltersDrawerOpen}
        category={categoryFilter}
        sort={sort}
        categories={categories}
        onChangeCategory={setCategoryFilter}
        onChangeSort={setSort}
      />
    </>
  );
}
