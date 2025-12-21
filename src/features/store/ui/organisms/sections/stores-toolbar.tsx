"use client";

import { useState } from "react";

import { ListFilter, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/ui/atoms/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";

const SORT_OPTIONS = ["По популярности", "Сначала дешёвые", "Сначала дорогие"];
const CATEGORIES = ["Все", "Одежда", "Обувь", "Аксессуары"];

export function StoresToolbar() {
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);

  return (
    <div className="flex w-full items-center gap-2 md:justify-between">
      {/* SEARCH */}
      <div className="flex-1 md:max-w-xs">
        <InputGroup>
          <InputGroupInput placeholder="Поиск товаров..." className="h-9" />
          <InputGroupAddon>
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-2">
        {/* SORT */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 md:w-auto md:px-3">
              <SlidersHorizontal className="text-muted-foreground h-4 w-4" />
              <span className="ml-2 hidden md:inline">Сортировка</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Сортировка</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {SORT_OPTIONS.map((item) => (
              <DropdownMenuCheckboxItem key={item} checked={sort === item} onCheckedChange={() => setSort(item)}>
                {item}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* FILTER / CATEGORY */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 md:w-auto md:px-3">
              <ListFilter className="text-muted-foreground h-4 w-4" />
              <span className="ml-2 hidden md:inline">Фильтры</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Категория</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {CATEGORIES.map((item) => (
              <DropdownMenuCheckboxItem
                key={item}
                checked={category === item}
                onCheckedChange={() => setCategory(item)}
              >
                {item}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
