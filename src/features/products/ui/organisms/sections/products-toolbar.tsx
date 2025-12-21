"use client";

import { ListFilter, Search, SlidersHorizontal, FileDown, RotateCcw, PlusIcon } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";

import { CreateProductDialog } from "../create-product-dialog";

interface ProductsHeaderSectionProps {
  onCreate: (data: any) => void;
}

export function ProductsToolbar({ onCreate }: ProductsHeaderSectionProps) {
  return (
    <div className="flex w-full flex-row items-center gap-2 md:justify-between">
      <div className="flex-[0.8] md:max-w-xs md:flex-1">
        <InputGroup className="w-full">
          <InputGroupInput placeholder="Поиск товаров..." className="h-9" />
          <InputGroupAddon>
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex flex-[0.2] items-center justify-end gap-2 md:flex-initial">
        <Button variant="outline" size="sm" className="flex h-9 min-w-9 items-center justify-center p-0 md:px-3">
          <SlidersHorizontal className="text-muted-foreground h-4 w-4" />
          <span className="hidden md:inline">Сортировка</span>
        </Button>

        <Button variant="outline" size="sm" className="flex h-9 min-w-9 items-center justify-center p-0 md:px-3">
          <ListFilter className="text-muted-foreground h-4 w-4" />
          <span className="hidden md:inline">Фильтры</span>
        </Button>

        <Button variant="outline" size="sm" className="flex h-9 min-w-9 items-center justify-center p-0 md:px-3">
          <RotateCcw className="text-muted-foreground h-4 w-4" />
          <span className="hidden md:inline">Сбросить</span>
        </Button>

        <Button variant="outline" size="sm" className="flex h-9 min-w-9 items-center justify-center p-0 md:px-3">
          <FileDown className="text-muted-foreground h-4 w-4" />
          <span className="hidden md:inline">Экспорт</span>
        </Button>
        <CreateProductDialog onCreate={onCreate}>
          <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            Добавить товар
          </Button>
        </CreateProductDialog>
      </div>
    </div>
  );
}
