"use client";

import Image from "next/image";

import { Coins, MoreVertical, Package, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Product } from "@/data/fake-products";

interface ProductCardProps {
  product: Product;
  isMobile: boolean;
  onOpenMobile?: (product: Product) => void;
}

function ProductCard({ product, isMobile, onOpenMobile }: ProductCardProps) {
  const handleClick = () => {
    if (!isMobile || !onOpenMobile) return;
    onOpenMobile(product);
  };

  if (isMobile) {
    return (
      <Card
        className="group relative cursor-pointer overflow-hidden rounded-2xl border-none bg-white shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98]"
        onClick={handleClick}
      >
        {/* Image Container with Gradient Overlay */}
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={product.photo_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

          {/* Stock Badge */}
          {product.quantity > 0 && (
            <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2.5 py-1 shadow-sm backdrop-blur-sm">
              <p className="text-[10px] font-semibold text-emerald-600">{product.quantity} шт</p>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {product.quantity === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
              <span className="text-sm font-semibold text-white">Нет в наличии</span>
            </div>
          )}

          {/* Price Tag - Bottom Overlay */}
          <div className="absolute right-0 bottom-0 left-0 p-3">
            <div className="flex items-end justify-between">
              <div className="mr-2 min-w-0 flex-1">
                <p className="mb-1 line-clamp-2 text-xs font-medium text-white drop-shadow-sm">{product.name}</p>
                <div className="inline-flex items-baseline gap-1 rounded-lg bg-white/95 px-2 py-1 shadow-sm backdrop-blur-sm">
                  <span className="text-lg font-bold text-gray-900">{product.price.toLocaleString()}</span>
                  <span className="text-xs font-semibold text-gray-600">$</span>
                </div>
              </div>

              {/* Category or Unit Badge */}
              <div className="rounded-lg bg-white/90 px-2 py-1 shadow-sm backdrop-blur-sm">
                <p className="text-[10px] font-medium text-gray-600">{product.unit}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden transition hover:shadow-lg">
      <div className="relative h-40 w-full">
        <Image src={product.photo_url} alt={product.name} fill className="object-cover" />
      </div>

      <div className="flex items-start justify-between p-4 pb-2">
        <div>
          <h3 className="leading-tight font-semibold">{product.name}</h3>
          <p className="text-muted-foreground text-sm">{product.category}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Редактировать</DropdownMenuItem>
            <DropdownMenuItem>Удалить</DropdownMenuItem>
            <DropdownMenuItem>Сделать публичным</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-muted h-px w-full" />

      <div className="space-y-2 px-4 pt-2 pb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground flex items-center gap-1">
            <Tag className="h-4 w-4" /> Ед.
          </span>
          <span>{product.unit}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground flex items-center gap-1">
            <Package className="h-4 w-4" /> Кол-во
          </span>
          <span>{product.quantity}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground flex items-center gap-1">
            <Coins className="h-4 w-4" /> Цена
          </span>
          <span>{product.price.toLocaleString()} $</span>
        </div>
      </div>
    </Card>
  );
}

interface ProductsGridProps {
  products: Product[];
  isMobile: boolean;
  onOpenMobileProduct: (product: Product) => void;
}

export function ProductsGrid({ products, isMobile, onOpenMobileProduct }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-3 md:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} isMobile={isMobile} onOpenMobile={onOpenMobileProduct} />
      ))}
    </div>
  );
}
