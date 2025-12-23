"use client";

import { useState } from "react";

import Image from "next/image";

import { ShoppingCartIcon, Check } from "lucide-react";

import type { Product } from "@/features/seller/types/product.types";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Card } from "@/shared/ui/atoms/card";

interface ProductCardMobileProps {
  product: Product;
  onOpen: () => void;
}

export function ProductCardMobile({ product, onOpen }: ProductCardMobileProps) {
  const [added, setAdded] = useState(false);

  return (
    <Card className="relative overflow-hidden rounded-xl border border-black/5 bg-white p-0 shadow-md" onClick={onOpen}>
      <div className="relative aspect-3/4 w-full">
        <Image src={product.photo_url} alt={product.name} fill className="object-cover" />

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent">
          <div className="p-1">
            <p className="line-clamp-1 text-[10px] text-white">{product.name}</p>

            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-black/40 px-1.5 py-0.5 text-[11px] text-white">
                10шт / {product.price.toLocaleString()}$ / 1200$
              </span>

              <Button
                size="icon"
                variant="ghost"
                className="relative h-10 w-10 rounded-xl bg-black/40 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1000);
                }}
              >
                <ShoppingCartIcon
                  className={cn("absolute h-5 w-5 transition-opacity", added && "scale-75 opacity-0")}
                />
                <Check className={cn("absolute h-5 w-5 transition-opacity", !added && "scale-125 opacity-0")} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
