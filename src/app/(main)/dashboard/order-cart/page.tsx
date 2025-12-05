"use client";

import { useState } from "react";

import Image from "next/image";

import { Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";

import { fakeProducts } from "@/features/products/fake-products";
import { Button } from "@/shared/ui/atoms/button";

export default function OrderCartPage() {
  const [items, setItems] = useState(fakeProducts);
  const isEmpty = items.length === 0;

  const updateQuantity = (id: number, delta: number) => {
    setItems(
      (prev) =>
        prev
          .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
          .filter((item) => item.quantity > 0), // удаляем если стало 0
    );
  };

  if (isEmpty) return <EmptyState />;

  return (
    <div className="w-full space-y-5 pt-4 pb-24">
      <h1 className="text-2xl font-semibold">Корзина</h1>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        {items.map((item, idx) => (
          <div key={item.id}>
            <CartItem
              item={item}
              onIncrease={() => updateQuantity(item.id, +1)}
              onDecrease={() => updateQuantity(item.id, -1)}
            />
            {idx !== items.length - 1 && <div className="mx-4 border-b" />}
          </div>
        ))}
      </div>

      <CartSummary items={items} />
    </div>
  );
}

function CartItem({
  item,
  onIncrease,
  onDecrease,
}: {
  item: (typeof fakeProducts)[number];
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  const isSingle = item.quantity === 1;

  return (
    <div className="flex items-start justify-between gap-3 px-4 py-3 md:px-5 md:py-4">
      {/* LEFT */}
      <div className="flex gap-3">
        <div className="relative h-16 w-16 overflow-hidden rounded-xl md:h-20 md:w-20">
          <Image src={item.photo_url} alt={item.name} fill className="object-cover" />
        </div>

        <div className="flex flex-col space-y-1">
          <p className="text-[15px] font-medium">{item.name}</p>
          <p className="text-muted-foreground text-xs md:text-sm">
            {item.unit} · {item.price.toLocaleString()}$
          </p>
          <p className="text-muted-foreground text-[11px]">Всего: {(item.quantity * item.price).toLocaleString()}$</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg md:h-9 md:w-9" onClick={onDecrease}>
          {isSingle ? <Trash2 className="h-4 w-4 text-red-500" /> : <Minus className="h-4 w-4" />}
        </Button>

        <span className="min-w-[30px] text-center text-sm md:text-base">{item.quantity}</span>

        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg md:h-9 md:w-9" onClick={onIncrease}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function CartSummary({ items }: { items: typeof fakeProducts }) {
  const total = items.reduce((acc, i) => acc + i.quantity * i.price, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="rounded-3xl border bg-white px-5 py-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <span className="text-muted-foreground text-sm">
            Выбрано: <span className="text-foreground font-semibold">{count}</span>
          </span>
        </div>

        <div className="text-right">
          <span className="text-muted-foreground block text-xs">Итого</span>
          <span className="block text-xl font-bold tracking-tight">{total.toLocaleString()}$</span>
        </div>
      </div>

      <Button className="w-full rounded-xl py-4 text-base font-semibold">Подтвердить заказ</Button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-lg font-medium">Корзина пустая</p>
      <p className="text-muted-foreground mt-1 text-sm">Добавьте товары, чтобы оформить заказ</p>
    </div>
  );
}
