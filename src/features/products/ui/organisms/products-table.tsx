"use client";

import Image from "next/image";

import { MoreVertical } from "lucide-react";

import type { Product } from "@/features/products/types/product.types";
import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
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
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-muted/30 border-t transition">
              <td className="p-3">
                <Image src={p.photo_url} alt={p.name} width={50} height={50} className="rounded-md object-cover" />
              </td>

              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3">{p.category}</td>
              <td className="p-3">{p.quantity}</td>
              <td className="p-3">{p.price.toLocaleString()} $</td>

              <td className="p-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
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
  );
}
