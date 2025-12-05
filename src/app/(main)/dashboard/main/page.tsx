"use client";

import Image from "next/image";
import Link from "next/link";

import { TrendingUp, Package, Users, ShoppingCart, CheckCircle2, Clock } from "lucide-react";

import { fakeProducts } from "@/features/products/fake-products";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/atoms/tabs";

import { StatCard } from "./stat-card";

const recentOrders = [
  {
    id: "ORD-1045",
    client: "Asat",
    items: 48,
    total: 3200,
    status: "В пути",
    createdAt: "Сегодня, 12:30",
  },
  {
    id: "ORD-1044",
    client: "Tarlan",
    items: 24,
    total: 1800,
    status: "Подтвержден",
    createdAt: "Вчера, 17:10",
  },
  {
    id: "ORD-1043",
    client: "Dress House",
    items: 12,
    total: 950,
    status: "Emre",
    createdAt: "Вчера, 10:05",
  },
];

const statusStyles: Record<string, string> = {
  Подтвержден: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "В пути": "bg-sky-50 text-sky-700 border-sky-200",
  Сборка: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function MainPage() {
  const totalProducts = fakeProducts.length;
  const totalClients = 18;
  const confirmedOrders = 27;
  const revenue = 12450;

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-4 py-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">Панель управления</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Краткий обзор ваших товаров, клиентов и подтвержденных заказов.
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" className="rounded-xl text-sm">
            <Link href="/dashboard/products">Добавить товар</Link>
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Подтверждено заказов"
          value={confirmedOrders}
          icon={CheckCircle2}
          subtitle="за последний период"
        />
        <StatCard label="Товаров в каталоге" value={totalProducts} icon={Package} subtitle="актуальные позиции" />
        <StatCard label="Клиентов" value={totalClients} icon={Users} subtitle="активные покупатели" />
        <StatCard
          label="Оборот"
          value={`$${revenue.toLocaleString()}`}
          icon={TrendingUp}
          subtitle="по подтвержденным заказам"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* ЛЕВАЯ КОЛОНКА — заказы / товары */}
        <div className="bg-background/80 rounded-2xl border p-4 shadow-sm backdrop-blur">
          <Tabs defaultValue="orders">
            <div className="flex items-center justify-between gap-2">
              <TabsList className="bg-muted h-9 rounded-full px-1">
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-background rounded-full px-3 py-1 text-xs sm:text-sm"
                >
                  Заказы
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="data-[state=active]:bg-background rounded-full px-3 py-1 text-xs sm:text-sm"
                >
                  Товары
                </TabsTrigger>
              </TabsList>

              <Button asChild variant="ghost" size="icon" className="hidden rounded-full md:inline-flex">
                <Link href="/dashboard/main">
                  <Clock className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <TabsContent value="orders" className="mt-4 space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card/70 flex items-start gap-3 rounded-xl border p-3 text-sm shadow-sm"
                >
                  <div className="bg-primary/10 text-primary mt-0.5 flex h-8 w-8 items-center justify-center rounded-full">
                    <ShoppingCart className="h-4 w-4" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-medium">{order.client}</span>
                      <span className="text-muted-foreground text-xs">{order.createdAt}</span>
                    </div>
                    <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                      <span>
                        {order.items} позиций · ${order.total.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground/70 hidden md:inline">•</span>
                      <Badge
                        variant="outline"
                        className={cn("border px-2 py-0.5 text-[11px]", statusStyles[order.status] ?? "")}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}

              <Button asChild variant="outline" className="mt-2 w-full rounded-xl text-sm">
                <Link href="/dashboard/clients">Открыть все заказы</Link>
              </Button>
            </TabsContent>

            <TabsContent value="products" className="mt-4 space-y-3">
              {fakeProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-card/70 flex items-center gap-3 rounded-xl border p-3 text-sm shadow-sm"
                >
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                    <Image src={product.photo_url} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-1 font-medium">{product.name}</p>
                      <span className="text-muted-foreground text-xs">{product.unit}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Остаток: {product.quantity} · ${product.price.toLocaleString()}/серия
                    </p>
                    {product.comment ? (
                      <p className="text-muted-foreground/80 mt-0.5 line-clamp-1 text-xs">{product.comment}</p>
                    ) : null}
                  </div>
                </div>
              ))}

              <Button asChild variant="outline" className="mt-2 w-full rounded-xl text-sm">
                <Link href="/dashboard/products">Открыть все товары</Link>
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* ПРАВАЯ КОЛОНКА — краткий обзор */}
        <div className="flex flex-col gap-4">
          <div className="bg-background/80 rounded-2xl border p-4 shadow-sm backdrop-blur">
            <h2 className="text-sm font-semibold">Сводка по корзине</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Быстрый обзор составленных серий перед оформлением заказов.
            </p>

            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Позиции в корзине</span>
                <span className="font-medium">{fakeProducts.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Ориентировочный оборот</span>
                <span className="font-medium">
                  ${fakeProducts.reduce((acc, p) => acc + p.price * p.quantity, 0).toLocaleString()}
                </span>
              </div>
            </div>

            <Button asChild className="mt-4 w-full rounded-xl text-sm">
              <Link href="/dashboard/order-cart">
                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                Перейти к подтверждению
              </Link>
            </Button>
          </div>

          <div className="bg-background/80 rounded-2xl border p-4 shadow-sm backdrop-blur">
            <h2 className="text-sm font-semibold">Замеченные риски</h2>
            <p className="text-muted-foreground mt-1 text-xs">
              Позже сюда можно подтянуть аналитику: низкий остаток, зависшие серии и т.п.
            </p>

            <ul className="text-muted-foreground mt-3 space-y-2 text-xs">
              <li>• Добавьте клиентов, чтобы видеть статистику по покупателям.</li>
              <li>• Отмечайте подтвержденные заказы, чтобы считать оборот точнее.</li>
              <li>• Настройте статусы товаров (активен / скрыт / только опт).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// простая util, чтобы не тащить cn отовсюду если не хочешь
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
