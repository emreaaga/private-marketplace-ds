"use client";

import { Filter } from "lucide-react";

import type { ProductSort } from "@/features/products/lib/filter-products";
import { Button } from "@/shared/ui/atoms/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/atoms/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

interface ProductsFiltersDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  sort: ProductSort;
  categories: string[];
  onChangeCategory: (value: string) => void;
  onChangeSort: (value: ProductSort) => void;
}

export function ProductsFiltersDrawer({
  open,
  onOpenChange,
  category,
  sort,
  categories,
  onChangeCategory,
  onChangeSort,
}: ProductsFiltersDrawerProps) {
  const handleApply = () => {
    onOpenChange(false);
  };

  const handleReset = () => {
    onChangeCategory("all");
    onChangeSort("none");
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <div className="overflow-y-auto px-4 pb-4">
          <DrawerHeader className="px-0">
            <DrawerTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Фильтры
            </DrawerTitle>
            <DrawerDescription>Настрой категорию и сортировку товаров</DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Категория</p>
              <Select value={category} onValueChange={onChangeCategory}>
                <SelectTrigger className="w-full">
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
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Сортировка</p>
              <Select value={sort} onValueChange={(v) => onChangeSort(v as ProductSort)}>
                <SelectTrigger className="w-full">
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
          </div>

          <DrawerFooter className="px-0">
            <Button className="w-full" onClick={handleApply}>
              Применить
            </Button>
            <Button variant="outline" className="w-full" onClick={handleReset}>
              Сбросить
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
