"use client";

import Image from "next/image";

import { Package, Tag, MessageSquare } from "lucide-react";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import type { Product } from "@/data/fake-products";

interface ProductViewDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export function ProductViewDrawer({ open, onOpenChange, product }: ProductViewDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh]">
        {!product ? null : (
          <div className="flex flex-col overflow-hidden">
            {/* Header */}
            <DrawerHeader className="flex-shrink-0 pb-2">
              <DrawerTitle className="text-lg">{product.name}</DrawerTitle>
              <DrawerDescription className="text-xs">{product.category}</DrawerDescription>
            </DrawerHeader>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              <div className="space-y-4">
                {/* Фото на всю ширину */}
                <div className="relative -mx-4 aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg">
                  <Image src={product.photo_url} alt={product.name} fill className="object-cover" priority />

                  {/* Stock Badge */}
                  {product.quantity > 0 && (
                    <div className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                      <p className="text-xs font-semibold text-emerald-600">В наличии: {product.quantity}</p>
                    </div>
                  )}

                  {product.quantity === 0 && (
                    <div className="absolute top-3 right-3 rounded-full bg-red-500/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                      <p className="text-xs font-semibold text-white">Нет в наличии</p>
                    </div>
                  )}
                </div>

                {/* Price Card */}
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-gray-600">Цена</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()}</span>
                      <span className="text-lg font-semibold text-gray-600">$</span>
                    </div>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="rounded-lg bg-white p-2 shadow-sm">
                        <Tag className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Единица измерения</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{product.unit}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="rounded-lg bg-white p-2 shadow-sm">
                        <Package className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Количество</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{product.quantity}</span>
                  </div>
                </div>

                {/* Comment Section */}
                {product.comment && (
                  <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                    <div className="mb-2 flex items-start gap-2.5">
                      <div className="rounded-lg bg-white p-2 shadow-sm">
                        <MessageSquare className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Комментарий</span>
                    </div>
                    <p className="pl-11 text-sm leading-relaxed whitespace-pre-line text-gray-700">{product.comment}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
