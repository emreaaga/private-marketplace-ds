"use client";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

export default function CreateCategoryDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Создать категорию продуктов</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input placeholder="Категория" />

          <Input placeholder="Подкатегория" />

          <div className="flex flex-col gap-1.5">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Тип продукта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical">Физ. товар</SelectItem>
                <SelectItem value="digital">Циф. товар</SelectItem>
                <SelectItem value="service">Услуга</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button disabled>Создать</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
