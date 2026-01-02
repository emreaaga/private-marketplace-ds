"use client";

import { useState } from "react";

import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/atoms/dialog";
import { Input } from "@/shared/ui/atoms/input";

import ShipmentHeader from "../_components/shipment-header";

interface ShipmentPost {
  id: string;
  name: string;
  status: "ACTIVE" | "BLOCKED";
  weightLimit: number;
  weightUsed: number;
}

export default function ShipmentPostsPage() {
  const shipmentStatus = "OPEN";
  const shipmentCapacity = 3000;
  const shipmentUsed = 1240;

  const [posts] = useState<ShipmentPost[]>([
    {
      id: "post-1",
      name: "Express Post",
      status: "ACTIVE",
      weightLimit: 500,
      weightUsed: 320,
    },
    {
      id: "post-2",
      name: "Global Cargo",
      status: "ACTIVE",
      weightLimit: 800,
      weightUsed: 610,
    },
  ]);

  const canManagePosts = shipmentStatus === "OPEN";

  return (
    <>
      <ShipmentHeader />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">
              Доступно: {shipmentCapacity - shipmentUsed} / {shipmentCapacity} кг
            </span>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={!canManagePosts}>Добавить почту</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить почту</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <Input placeholder="Выберите почту" disabled />
                <Input type="number" placeholder="Лимит веса (КГ)" disabled />

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost">Отмена</Button>
                  <Button disabled>Добавить</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border">
          {posts.length === 0 ? (
            <div className="text-muted-foreground p-6 text-sm">В эту отправку пока не добавлены почты.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-muted-foreground border-b">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Почта</th>
                  <th className="px-4 py-2 text-left font-medium">Статус</th>
                  <th className="px-4 py-2 text-right font-medium">Лимит (кг)</th>
                  <th className="px-4 py-2 text-right font-medium">Использовано</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b last:border-0">
                    <td className="px-4 py-2">{post.name}</td>
                    <td className="px-4 py-2">{post.status}</td>
                    <td className="px-4 py-2 text-right">{post.weightLimit} кг</td>
                    <td className="px-4 py-2 text-right">{post.weightUsed} кг</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
