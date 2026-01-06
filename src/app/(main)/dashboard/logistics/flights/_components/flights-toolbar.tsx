"use client";

import { useState } from "react";

import { ListFilter, PlusIcon, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { IconButton } from "@/shared/ui/molecules/icon-button";

import { FlightsDialog } from "./create-flight-dialog";

export function FlightsToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full gap-2 md:max-w-xl">
          <InputGroup className="flex h-9 flex-1">
            <InputGroupInput placeholder="Поиск" className="h-9 flex-1" />
            <InputGroupAddon>
              <Search className="text-muted-foreground h-4 w-4" />
            </InputGroupAddon>
          </InputGroup>

          <Button size="sm" className="h-9" onClick={() => setOpen(true)}>
            <PlusIcon className="h-3 w-3" />
            <span>Создать рейс</span>
          </Button>
        </div>

        <div className="flex gap-2">
          <IconButton Icon={SlidersHorizontal} label="Сортировка" />
          <IconButton Icon={ListFilter} label="Фильтры" />
          <IconButton Icon={RotateCcw} label="Сбросить" />
        </div>
      </div>

      <FlightsDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
