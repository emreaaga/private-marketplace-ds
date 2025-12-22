"use client";

import { useState } from "react";

import { ListFilter, Search, SlidersHorizontal, RotateCcw, PlusIcon } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/atoms/dialog";
import { Input } from "@/shared/ui/atoms/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { IconButton } from "@/shared/ui/molecules/icon-button";

export function GeneralSettingsRoleToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-col gap-2 md:max-w-xl md:flex-row">
        <InputGroup className="w-full md:flex-1">
          <InputGroupInput placeholder="Поиск пользователей" className="h-9" />
          <InputGroupAddon>
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex w-full justify-between gap-2 md:w-auto md:justify-end">
        <IconButton Icon={SlidersHorizontal} label="Сортировка" />
        <IconButton Icon={ListFilter} label="Фильтры" />
        <IconButton Icon={RotateCcw} label="Сбросить" />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon />
              Создать
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Создание роли</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input placeholder="Название роли (например: manager)" />
              <Input placeholder="Описание (опционально)" />

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Отмена
                </Button>
                <Button>Создать роль</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
