"use client";

import { useState } from "react";

import { fakeProducts } from "@/features/seller/fake-products";

import type { CartItemType } from "../model/types";

export function useOrderCart() {
  const [items] = useState<CartItemType[]>(fakeProducts);

  return {
    items,
    isEmpty: items.length === 0,
  };
}
