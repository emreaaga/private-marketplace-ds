"use client";

import { useState } from "react";

import Image from "next/image";

import { MessageSquare, Package, Tag } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import type { Product } from "@/features/products/types/product.types";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/shared/ui/atoms/drawer";

// LIGHTBOX
import "yet-another-react-lightbox/styles.css";

export function ProductViewDrawer({
  open,
  onOpenChange,
  product,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}) {
  const [isLightboxOpen, setLightboxOpen] = useState(false);

  if (!product) return null;

  return (
    <>
      {/* MAIN DRAWER */}
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[92vh] overflow-hidden rounded-t-2xl">
          <div className="flex h-full flex-col">
            {/* HEADER */}
            <DrawerHeader className="pb-2">
              <DrawerTitle className="text-lg font-semibold">{product.name}</DrawerTitle>
              <DrawerDescription className="text-xs">{product.category}</DrawerDescription>
            </DrawerHeader>

            {/* IMAGE BLOCK (click → open Lightbox) */}
            <div
              className="relative mx-auto h-[45vh] w-full max-w-sm cursor-zoom-in overflow-hidden rounded-xl transition active:scale-[0.98]"
              onClick={() => setLightboxOpen(true)}
            >
              <Image src={product.photo_url} alt={product.name} fill className="object-cover object-center" priority />

              {/* BADGE */}
              {product.quantity > 0 ? (
                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1.5 shadow-md backdrop-blur">
                  <p className="text-xs font-semibold text-emerald-600">В наличии: {product.quantity}</p>
                </div>
              ) : (
                <div className="absolute top-3 right-3 rounded-full bg-red-500/90 px-3 py-1.5 shadow-md backdrop-blur">
                  <p className="text-xs font-semibold text-white">Нет в наличии</p>
                </div>
              )}
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="mt-4 flex-1 space-y-4 overflow-y-auto px-4 pb-8">
              {/* PRICE */}
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-gray-600">Цена</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()}</span>
                    <span className="text-lg font-semibold text-gray-600">$</span>
                  </div>
                </div>
              </div>

              {/* INFO BLOCKS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-white p-2 shadow-sm">
                      <Tag className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Ед. измерения</span>
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

              {/* COMMENT */}
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
        </DrawerContent>
      </Drawer>

      <Lightbox
        open={isLightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: product.photo_url }]}
        plugins={[Zoom]}
      />
    </>
  );
}
