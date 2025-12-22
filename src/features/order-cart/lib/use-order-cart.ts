"use client";

import { useState } from "react";

import { fakeProducts } from "@/features/seller/fake-products";

import type { CartItemType } from "../model/types";

export function useOrderCart() {
  const [items, setItems] = useState<CartItemType[]>(fakeProducts);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  return {
    items,
    isEmpty: items.length === 0,
    updateQuantity,
  };
}
