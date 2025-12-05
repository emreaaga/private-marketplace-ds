"use client";

import Image from "next/image";

import { Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";

import { fakeProducts } from "@/features/products/fake-products";
import { Button } from "@/shared/ui/atoms/button";

export default function OrderCartPage() {
  const items = fakeProducts;
  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-4">
        <h1 className="mb-4 text-2xl font-semibold">Корзина</h1>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 px-4 py-4 pb-6">
      <h1 className="text-2xl font-semibold">Корзина</h1>

      <CartSummary items={items} />

      <div className="mt-2 flex-1 space-y-3 md:space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function CartSummary({ items }: { items: typeof fakeProducts }) {
  const total = items.reduce((acc, i) => acc + i.quantity * i.price, 0);
  const count = items.length;

  return (
    <div className="sticky top-2 z-30 flex justify-center">
      <div className="relative inline-flex w-full max-w-md items-center gap-3 rounded-2xl bg-white/40 px-3 py-2 shadow-[inset_0_0_1px_rgba(255,255,255,0.4)] shadow-black/20 backdrop-blur-md md:max-w-none md:px-4 md:py-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <div className="flex flex-col">
            <span className="text-xs font-medium md:text-sm">Выбрано</span>
            <span className="text-sm font-semibold md:text-base">{count} позиций</span>
          </div>
        </div>

        <div className="ml-auto flex flex-col text-right">
          <span className="text-xs font-medium md:text-sm">Итого</span>
          <span className="text-sm font-semibold md:text-base">{total.toLocaleString()}$</span>
        </div>

        <Button size="sm" className="hidden rounded-xl text-xs font-medium whitespace-nowrap md:inline-flex md:text-sm">
          Подтвердить
        </Button>
      </div>
    </div>
  );
}

function CartItem({ item }: { item: (typeof fakeProducts)[number] }) {
  return (
    <div className="bg-card flex w-full items-center gap-3 rounded-2xl border p-3 shadow-sm backdrop-blur-md md:gap-4 md:p-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-xl md:h-24 md:w-24">
        <Image src={item.photo_url} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-base font-medium">{item.name}</p>
        <p className="text-muted-foreground text-xs md:text-sm">
          {item.quantity} {item.unit} × {item.price.toLocaleString()}$
        </p>

        <div className="mt-2 flex items-center gap-2">
          <Button type="button" variant="outline" size="icon" className="h-8 w-8 rounded-lg md:h-9 md:w-9">
            <Minus className="h-4 w-4" />
          </Button>

          <span className="min-w-8 text-center text-sm md:text-base">{item.quantity}</span>

          <Button type="button" variant="outline" size="icon" className="h-8 w-8 rounded-lg md:h-9 md:w-9">
            <Plus className="h-4 w-4" />
          </Button>

          <Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive ml-auto">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="text-muted-foreground mb-3">
        <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m2-9l2 9m10-9l2 9m-2-9l-2 9" />
        </svg>
      </div>
      <p className="text-lg font-medium">Корзина пустая</p>
      <p className="text-muted-foreground mt-1 text-sm">Добавьте товары, чтобы оформить заказ</p>
    </div>
  );
}
