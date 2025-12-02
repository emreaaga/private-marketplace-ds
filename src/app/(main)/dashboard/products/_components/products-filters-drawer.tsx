"use client";

import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

interface ProductsFiltersDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  sort: string;
  categories: string[];
  onChangeCategory: (value: string) => void;
  onChangeSort: (value: string) => void;
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
              <Select value={sort} onValueChange={onChangeSort}>
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
