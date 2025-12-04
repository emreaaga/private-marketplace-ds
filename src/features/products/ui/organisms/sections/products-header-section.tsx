"use client";

import { CreateProductDialog } from "@/features/products/ui/organisms/create-product-dialog";
import { TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

interface ProductsHeaderSectionProps {
  onCreate: (data: any) => void;
}

export function ProductsHeaderSection({ onCreate }: ProductsHeaderSectionProps) {
  return (
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

        <CreateProductDialog buttonClassName="w-full md:w-auto" onCreate={onCreate} />
      </div>
    </div>
  );
}
