"use client";

import { useState } from "react";

import Image from "next/image";

import { Heart, ListFilter, ShoppingCart, SlidersHorizontal } from "lucide-react";

import { fakeProducts } from "@/app/(main)/dashboard/seller/main/_components/fake-products";
import type { Product } from "@/app/(main)/dashboard/seller/main/_components/types/product.types";
import { Button } from "@/shared/ui/atoms/button";

function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="relative h-85 w-full overflow-hidden rounded-xl bg-neutral-100">
      <Image
        src={product.photo_url}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
        className="object-cover"
      />

      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-2">
        <div className="max-w-[75%] rounded-lg border border-white/20 bg-black/45 px-2 py-1 text-white">
          <h3 className="line-clamp-2 text-[11px] leading-snug font-medium">{product.name}</h3>
        </div>

        <button
          onClick={() => setIsFavorite((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white transition-colors active:scale-95"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-3">
        <div className="flex items-end justify-between gap-2">
          <div className="max-w-[82%] rounded-xl border border-white/20 bg-black/45 px-3 py-1.5 text-white">
            <span className="block text-[11px] font-semibold opacity-90">10шт · {product.price}$ · 1200$</span>
          </div>

          <button
            onClick={() => console.log("Added to cart:", product.id)}
            className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-black/45 text-white transition-colors active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-black/70 to-transparent" />
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-1.5">
        <Button variant="action" size="sm" className="px-2.5">
          <SlidersHorizontal size={14} strokeWidth={2} className="text-muted-foreground/40" />
          <span className="hidden sm:inline">Сортировка</span>
        </Button>
        <Button variant="action" size="sm" className="px-2.5">
          <ListFilter size={14} strokeWidth={2} className="text-muted-foreground/40" />
          <span className="hidden sm:inline">Фильтры</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {fakeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
