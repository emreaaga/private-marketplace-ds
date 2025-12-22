"use client";

import { ListFilter, Search, SlidersHorizontal } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { IconButton } from "@/shared/ui/molecules/icon-button";

export function StoresToolbar() {
  return (
    <div className="flex w-full items-center gap-2 md:justify-between">
      <div className="flex-1 md:max-w-xs">
        <InputGroup>
          <InputGroupInput placeholder="Поиск" className="h-9" />
          <InputGroupAddon>
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex items-center gap-2">
        <IconButton Icon={SlidersHorizontal} label="Сортировка" />
        <IconButton Icon={ListFilter} label="Фильтры" />
      </div>
    </div>
  );
}
