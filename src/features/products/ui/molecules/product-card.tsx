"use client";

import { useState } from "react";

import Image from "next/image";

import { Coins, MoreVertical, Package, ShoppingCart, Tag } from "lucide-react";

import type { Product } from "@/features/products/types/product.types";
import { Button } from "@/shared/ui/atoms/button";
import { Card } from "@/shared/ui/atoms/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";

import { AddToCartToggle } from "./add-to-card-toggle";

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
  const [inCart, setInCart] = useState(false);

  if (isMobile) {
    return (
      <Card
        className="relative overflow-hidden rounded-xl border border-black/5 bg-white p-0 shadow-md transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
        onClick={handleClick}
      >
        <div className="relative aspect-3/4 w-full">
          <Image src={product.photo_url} alt={product.name} fill className="object-cover" />

          <div className="absolute top-2 left-2 rounded-md bg-white/90 px-2 py-[3px] shadow backdrop-blur">
            <span className="text-sm leading-none font-bold text-gray-900">{product.price.toLocaleString()} $</span>
          </div>

          {product.quantity > 0 && (
            <div className="absolute top-2 right-2 rounded-md bg-white/90 px-2 py-[3px] shadow backdrop-blur">
              <span className="text-[11px] leading-none font-semibold text-emerald-600">{product.quantity} шт</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3">
            <p className="line-clamp-1 text-[13px] font-medium text-white drop-shadow">{product.name}</p>
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
