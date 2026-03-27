"use client";

import { useState } from "react";

import { Plus, Trash2, Truck, User } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
// Предположим, у тебя есть стандартные компоненты Dialog
// Если нет, можно заменить на обычный div с фиксированным позиционированием
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

export function TripCreateDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  // В реальном приложении здесь будут React Hook Form + Zod
  const [stops, setStops] = useState<{ id: string; code: string }[]>([
    { id: "1", code: "TAS" }, // Ташкент всегда первый (HUB)
  ]);

  const addStop = () => {
    const newStop = { id: Math.random().toString(), code: "" };
    setStops([...stops, newStop]);
  };

  const removeStop = (id: string) => {
    setStops(stops.filter((s) => s.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Создание маршрута</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Основная инфа */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-muted-foreground text-[11px] font-bold uppercase">Транспорт</label>
              <div className="relative">
                <Truck className="text-muted-foreground/50 absolute top-2.5 left-2.5 h-4 w-4" />
                <select className="border-input bg-background focus:ring-primary w-full appearance-none rounded-md border py-2 pr-3 pl-9 text-sm outline-none focus:ring-1">
                  <option>Isuzu (01 A 777 AA)</option>
                  <option>Labo (10 B 888 BB)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground text-[11px] font-bold uppercase">Водитель</label>
              <div className="relative">
                <User className="text-muted-foreground/50 absolute top-2.5 left-2.5 h-4 w-4" />
                <select className="border-input bg-background focus:ring-primary w-full appearance-none rounded-md border py-2 pr-3 pl-9 text-sm outline-none focus:ring-1">
                  <option>Begzod</option>
                  <option>Dilshod</option>
                </select>
              </div>
            </div>
          </div>

          {/* Редактор маршрута */}
          <div className="space-y-3">
            <label className="text-muted-foreground text-[11px] font-bold uppercase">Остановки и путь</label>

            <div className="space-y-2">
              {stops.map((stop, index) => (
                <div key={stop.id} className="group relative">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold">
                      {index + 1}
                    </div>

                    <select
                      value={stop.code}
                      onChange={() => {}}
                      className="border-input bg-background focus:ring-primary flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-1"
                    >
                      <option value="">Выберите город...</option>
                      <option value="TAS">Ташкент (TAS)</option>
                      <option value="SKD">Самарканд (SKD)</option>
                      <option value="BKH">Бухара (BKH)</option>
                      <option value="NKS">Нукус (NKS)</option>
                    </select>

                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeStop(stop.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                  {index < stops.length - 1 && (
                    <div className="border-muted-foreground/20 ml-4 flex h-4 w-0 border-l-2 border-dashed" />
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              onClick={addStop}
              className="border-muted-foreground/10 hover:border-primary/30 hover:bg-primary/5 mt-2 h-9 w-full border-2 border-dashed text-xs"
            >
              <Plus size={14} className="mr-2" />
              Добавить остановку
            </Button>
          </div>

          {/* Итоговая сводка (Preview) */}
          <div className="bg-muted/30 rounded-xl p-4">
            <div className="text-muted-foreground mb-2 flex justify-between text-[11px] font-bold uppercase">
              <span>Сводка по маршруту</span>
              <span className="text-primary italic">Авторасчет</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-background rounded-lg p-2 shadow-sm">
                <div className="text-lg font-bold">45</div>
                <div className="text-muted-foreground text-[9px] uppercase">Заказов</div>
              </div>
              <div className="bg-background rounded-lg p-2 shadow-sm">
                <div className="text-lg font-bold">1.2т</div>
                <div className="text-muted-foreground text-[9px] uppercase">Вес</div>
              </div>
              <div className="bg-background rounded-lg p-2 text-green-600 shadow-sm">
                <div className="text-lg font-bold">$12k</div>
                <div className="text-muted-foreground text-[9px] font-bold uppercase">Сбор</div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button variant="primary" className="px-8">
            Запустить рейс
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
