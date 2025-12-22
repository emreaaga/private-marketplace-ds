"use client";

import { useState } from "react";

import Image from "next/image";

import { ShoppingCartIcon, Check } from "lucide-react";

import type { Product } from "@/features/products/types/product.types";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Card } from "@/shared/ui/atoms/card";

export interface ProductCardBaseProps {
  product: Product;
}

interface ProductCardMobileProps extends ProductCardBaseProps {
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
              <span className="rounded-lg bg-white/10 text-[11px] text-white">
                10шт/ {product.price.toLocaleString()}$ / 1200$
              </span>

              <Button
                size="icon"
                variant="ghost"
                className="relative h-10 w-10 rounded-xl bg-white/10 text-white backdrop-blur"
                onClick={(e) => {
                  e.stopPropagation();
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1000);
                }}
              >
                <ShoppingCartIcon className={cn("absolute h-5 w-5", added && "scale-75 opacity-0")} />
                <Check className={cn("absolute h-5 w-5", !added && "scale-125 opacity-0")} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
