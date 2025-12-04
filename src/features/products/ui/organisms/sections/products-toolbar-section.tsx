"use client";

import { Filter as FilterIcon, Search } from "lucide-react";

import type { ProductSort } from "@/features/products/lib/filter-products";
import { Button } from "@/shared/ui/atoms/button";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

interface ProductsToolbarSectionProps {
  search: string;
  categoryFilter: string;
  sort: ProductSort;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: ProductSort) => void;
  onOpenFilters: () => void;
}

export function ProductsToolbarSection({
  search,
  categoryFilter,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onOpenFilters,
}: ProductsToolbarSectionProps) {
  return (
    <div className="mt-6 space-y-3 md:flex md:items-center md:justify-between md:space-y-0">
      <div className="flex w-full items-center gap-2">
        <Search className="text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Поиск по названию..."
          className="w-full"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="hidden gap-3 md:flex">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
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

        <Select value={sort} onValueChange={(v) => onSortChange(v as ProductSort)}>
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

      <Button
        type="button"
        variant="outline"
        className="flex w-full items-center justify-center gap-2 md:hidden"
        onClick={onOpenFilters}
      >
        <FilterIcon className="h-4 w-4" />
        <span>Фильтры</span>
      </Button>
    </div>
  );
}
