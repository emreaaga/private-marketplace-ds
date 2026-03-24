"use client";

import { CreditCard, Minus, Package, Plus, Trash2 } from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Acme Ultra Hoodie",
    meta: "Black / Large",
    price: 120.0,
    quantity: 1,
  },
  {
    id: 2,
    name: "Vercel Elements Hat",
    meta: "White / One Size",
    price: 35.0,
    quantity: 1,
  },
];

export default function SellerOrdersCartPage() {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-6 border-b border-gray-100 pb-8 last:border-0">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 text-gray-400">
                <Package size={32} strokeWidth={1.5} />
              </div>

              <div className="flex flex-1 flex-col justify-between py-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="mt-0.5 text-xs text-gray-500">{item.meta}</p>
                  </div>
                  <span className="text-sm font-medium">$ {item.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-lg border border-gray-100 p-0.5">
                    <button className="p-1.5 text-gray-400 transition-colors hover:text-black">
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-[13px]">{item.quantity}</span>
                    <button className="p-1.5 text-gray-400 transition-colors hover:text-black">
                      <Plus size={12} />
                    </button>
                  </div>

                  <button className="flex items-center gap-1.5 text-xs font-medium text-red-500 transition-colors hover:text-red-600">
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">Удалить</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-6 space-y-6 rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
            <h2 className="text-xs font-bold tracking-wider text-gray-400 uppercase">Детали заказа</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Товары (2)</span>
                <span className="text-black">$ 155.00</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Доставка</span>
                <span className="font-medium text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Налог</span>
                <span className="text-black">$ 12.40</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-5">
              <div className="flex items-end justify-between">
                <span className="text-sm font-medium">Итого к оплате</span>
                <span className="text-2xl font-bold">$ 167.40</span>
              </div>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-medium text-white transition-all hover:bg-black/90 active:scale-[0.98]">
              <CreditCard size={16} />
              Оформить заказ
            </button>
            <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-gray-400 uppercase">
              <div className="h-1 w-1 rounded-full bg-emerald-500" />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
