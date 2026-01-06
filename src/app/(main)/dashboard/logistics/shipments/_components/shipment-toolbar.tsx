"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { PlusIcon, Search, SlidersHorizontal, ListFilter, RotateCcw } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { IconButton } from "@/shared/ui/molecules/icon-button";

const ShipmentCreateDialog = dynamic(() => import("./shipment-create-dialog").then((m) => m.ShipmentCreateDialog), {
  ssr: false,
  loading: () => null,
});

export function ShipmentToolbar() {
  const [open, setOpen] = useState(false);
  const preloadDialog = () => {
    import("./shipment-create-dialog");
  };

  return (
    <>
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full gap-2 md:max-w-xl">
          <InputGroup className="h-9 flex-1">
            <InputGroupInput placeholder="Поиск" className="h-9" />
            <InputGroupAddon>
              <Search className="text-muted-foreground h-4 w-4" />
            </InputGroupAddon>
          </InputGroup>

          <Button
            size="sm"
            className="h-9"
            onMouseEnter={preloadDialog}
            onFocus={preloadDialog}
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="h-4 w-4" />
            Создать отправку
          </Button>
        </div>

        <div className="flex gap-2">
          <IconButton Icon={SlidersHorizontal} label="Сортировка" />
          <IconButton Icon={ListFilter} label="Фильтры" />
          <IconButton Icon={RotateCcw} label="Сбросить" />
        </div>
      </div>

      <ShipmentCreateDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
