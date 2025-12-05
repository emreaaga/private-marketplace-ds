"use client";

import Image from "next/image";

import { Coins, MoreVertical, Package, Tag } from "lucide-react";

import type { Product } from "@/features/products/types/product.types";
import { Button } from "@/shared/ui/atoms/button";
import { Card } from "@/shared/ui/atoms/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";

interface ProductCardProps {
  product: Product;
  isMobile: boolean;
  onOpenMobile?: (product: Product) => void;
}

export function ProductCard({ product, isMobile, onOpenMobile }: ProductCardProps) {
  const handleClick = () => {
    if (!isMobile || !onOpenMobile) return;
    onOpenMobile(product);
  };

  if (isMobile) {
    return (
      <Card
        className="relative overflow-hidden rounded-xl border border-black/5 bg-white p-0 shadow-md transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
        onClick={handleClick}
      >
        <div className="relative aspect-3/4 w-full">
          <Image src={product.photo_url} alt={product.name} fill className="object-cover" />

          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3">
            <p className="line-clamp-1 text-[14px] font-semibold tracking-tight text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              {product.name}
            </p>

            <div className="absolute right-2 bottom-2 rounded-xl bg-white/15 px-2 py-[3px] text-[11px] font-medium text-white shadow-[inset_0_0_0.5px_rgba(255,255,255,0.6)] shadow-black/20 backdrop-blur-md">
              {product.price.toLocaleString()}$ / {product.quantity}
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
            <Button size="icon" variant="ghost" className="h-8 w-8">
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
