"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { ListFilter, Search, SlidersHorizontal, RotateCcw, PlusIcon } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { IconButton } from "@/shared/ui/molecules/icon-button";

const CreateCategoryDialog = dynamic(() => import("./create-category-dialog"), {
  ssr: false,
});

export default function CategoriesToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
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

          <Button onClick={() => setOpen(true)}>
            <PlusIcon />
            Создать
          </Button>
        </div>
      </div>

      {open && <CreateCategoryDialog open={open} onOpenChange={setOpen} />}
    </>
  );
}
