"use client";

import { useState, useMemo } from "react";

import Image from "next/image";

import { Search, Tag, Package, Coins, MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { CreateProductDialog } from "./_components/create-product-dialog";
import { fakeProducts } from "./_components/fake-products";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sort, setSort] = useState("none");

  const categories = [...new Set(fakeProducts.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let data = [...fakeProducts];

    if (search.trim()) {
      data = data.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (categoryFilter !== "all") {
      data = data.filter((p) => p.category === categoryFilter);
    }

    if (sort === "price_asc") data.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") data.sort((a, b) => b.price - a.price);
    if (sort === "qty_asc") data.sort((a, b) => a.quantity - b.quantity);
    if (sort === "qty_desc") data.sort((a, b) => b.quantity - a.quantity);

    return data;
  }, [search, categoryFilter, sort]);

  const isEmpty = filteredProducts.length === 0;

  return (
    <Tabs defaultValue="grid" className="mx-auto max-w-6xl py-10">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Продукты</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Каталог оптовых товаров. Управляй позициями, ценами и публикацией.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center md:gap-4">
          <TabsList className="grid w-full grid-cols-2 md:w-[220px]">
            <TabsTrigger value="grid">Карточки</TabsTrigger>
            <TabsTrigger value="table">Таблица</TabsTrigger>
          </TabsList>

          <CreateProductDialog buttonClassName="w-full md:w-auto" onCreate={() => {}} />
        </div>
      </div>

      {/* FILTERS */}
      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* SEARCH */}
        <div className="flex w-full items-center gap-2">
          <Search className="text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Поиск по названию..."
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTERS RIGHT */}
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => setSort(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Без сортировки</SelectItem>
              <SelectItem value="price_asc">Цена ↑</SelectItem>
              <SelectItem value="price_desc">Цена ↓</SelectItem>
              <SelectItem value="qty_asc">Кол-во ↑</SelectItem>
              <SelectItem value="qty_desc">Кол-во ↓</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* EMPTY STATE */}
      {isEmpty && (
        <div className="mt-14 flex flex-col items-center gap-3 text-center">
          <Package className="text-muted-foreground h-16 w-16" />
          <h3 className="text-xl font-semibold">Нет товаров</h3>
          <p className="text-muted-foreground max-w-sm text-sm">Попробуй изменить фильтры или добавь первый товар.</p>
        </div>
      )}

      {!isEmpty && (
        <>
          {/* GRID VIEW */}
          <TabsContent value="grid" className="mt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {filteredProducts.map((p) => (
                <Card key={p.id} className="overflow-hidden transition hover:shadow-lg">
                  <div className="relative h-40 w-full">
                    <Image src={p.photo_url} alt={p.name} fill className="object-cover" />
                  </div>

                  <div className="flex items-start justify-between p-4 pb-2">
                    <div>
                      <h3 className="leading-tight font-semibold">{p.name}</h3>
                      <p className="text-muted-foreground text-sm">{p.category}</p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Редактировать</DropdownMenuItem>
                        <DropdownMenuItem>Удалить</DropdownMenuItem>
                        <DropdownMenuItem>Сделать публичным</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="bg-muted h-px w-full" />

                  <div className="space-y-2 px-4 pt-2 pb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Tag className="h-4 w-4" /> Ед.
                      </span>
                      <span>{p.unit}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Package className="h-4 w-4" /> Кол-во
                      </span>
                      <span>{p.quantity}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Coins className="h-4 w-4" /> Цена
                      </span>
                      <span>{p.price.toLocaleString()} сум</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TABLE VIEW */}
          <TabsContent value="table" className="mt-8">
            <div className="w-full overflow-x-auto rounded-md border">
              <table className="w-full min-w-[650px] text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-3">Фото</th>
                    <th className="p-3">Название</th>
                    <th className="p-3">Катег.</th>
                    <th className="p-3">Кол-во</th>
                    <th className="p-3">Цена</th>
                    <th className="p-3 text-right">Действия</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/30 border-t transition">
                      <td className="p-3">
                        <Image
                          src={p.photo_url}
                          alt={p.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      </td>

                      <td className="p-3 font-medium">{p.name}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">{p.quantity}</td>
                      <td className="p-3">{p.price.toLocaleString()} сум</td>

                      <td className="p-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Редактировать</DropdownMenuItem>
                            <DropdownMenuItem>Удалить</DropdownMenuItem>
                            <DropdownMenuItem>Сделать публичным</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </>
      )}

      {/* MOBILE FAB */}
      <Button className="fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-lg md:hidden">+</Button>
    </Tabs>
  );
}
