"use client";

import Image from "next/image";

import { Minus, Plus, Trash2 } from "lucide-react";

import type { CartItemType } from "../../model/types";
import { CartQuantityButton } from "../atoms/cart-quantity-button";

export function CartItem({ item }: { item: CartItemType }) {
  const isSingle = item.quantity === 1;
  const total = item.quantity * item.price;

  return (
    <div className="flex items-start justify-between gap-3 px-4 py-4 md:px-5 md:py-5">
      <div className="flex gap-3">
        <div className="relative h-20 w-20 overflow-hidden rounded-xl md:h-24 md:w-24">
          <Image
            src={item.photo_url}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90px, 120px"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <p className="text-[15px] leading-snug font-medium md:text-base">{item.name}</p>

          <p className="text-muted-foreground text-xs md:text-sm">
            {item.unit} · ${item.price}
          </p>

          {(item.unit || item.comment) && (
            <p className="text-muted-foreground hidden text-xs md:block">
              {item.unit}
              {item.comment && (
                <>
                  {" · "}
                  <span className="italic">{item.comment}</span>
                </>
              )}
            </p>
          )}

          <p className="text-muted-foreground text-xs md:text-sm">
            Всего: <span className="text-foreground font-semibold">${total}</span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <CartQuantityButton>
          {isSingle ? <Trash2 className="h-4 w-4 text-red-500" /> : <Minus className="h-4 w-4" />}
        </CartQuantityButton>

        <span className="min-w-8 text-center text-sm font-medium md:text-base">{item.quantity}</span>

        <CartQuantityButton>
          <Plus className="h-4 w-4" />
        </CartQuantityButton>
      </div>
    </div>
  );
}
