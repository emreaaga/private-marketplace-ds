"use client";

import { CreateProductDialog } from "@/features/products/ui/organisms/create-product-dialog";
import { TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

interface ProductsHeaderSectionProps {
  onCreate: (data: any) => void;
}

export function ProductsHeaderSection({ onCreate }: ProductsHeaderSectionProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between sm:hidden">
        <h2 className="text-xl font-bold tracking-tight">Продукты</h2>

        <CreateProductDialog buttonClassName="h-9 px-3 text-sm rounded-lg" onCreate={onCreate} />
      </div>

      <div className="hidden flex-col gap-1 sm:flex">
        <h2 className="text-3xl font-bold tracking-tight">Продукты</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Каталог оптовых товаров. Управляй позициями, ценами и публикацией.
        </p>
      </div>

      <div className="hidden sm:flex sm:items-center sm:gap-4">
        <TabsList className="grid grid-cols-2 md:w-[220px]">
          <TabsTrigger value="grid">Карточки</TabsTrigger>
          <TabsTrigger value="table">Таблица</TabsTrigger>
        </TabsList>

        <CreateProductDialog
          buttonClassName="
            h-10 px-4 text-sm
            md:h-11 md:text-base
          "
          onCreate={onCreate}
        />
      </div>
    </div>
  );
}
