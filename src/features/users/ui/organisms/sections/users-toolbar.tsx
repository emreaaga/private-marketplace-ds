"use client";

import { useState, useCallback } from "react";

import dynamic from "next/dynamic";

import { ListFilter, Search, SlidersHorizontal, RotateCcw, PlusIcon } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { IconButton } from "@/shared/ui/molecules/icon-button";

const CreateUserDialog = dynamic(() => import("../forms/create-user-dialog"), { ssr: false });

export function UsersToolbar() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setIsCreateDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback((open: boolean) => {
    setIsCreateDialogOpen(open);
  }, []);

  return (
    <>
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full gap-2 md:max-w-xl md:flex-row">
          <InputGroup className="flex h-9 flex-1">
            <InputGroupInput placeholder="Поиск" className="h-9 flex-1" />
            <InputGroupAddon>
              <Search className="text-muted-foreground h-4 w-4" />
            </InputGroupAddon>
          </InputGroup>

          <Button size="sm" className="h-9 flex-1 md:flex-none" onClick={handleOpenDialog}>
            <PlusIcon className="h-4 w-4" />
            <span>Создать</span>
          </Button>
        </div>

        <div className="flex w-full gap-2 md:w-auto md:justify-end">
          <IconButton Icon={SlidersHorizontal} label="Сортировка" />
          <IconButton Icon={ListFilter} label="Фильтры" />
          <IconButton Icon={RotateCcw} label="Сбросить" />
        </div>
      </div>

      {isCreateDialogOpen && <CreateUserDialog open={isCreateDialogOpen} onOpenChange={handleCloseDialog} />}
    </>
  );
}
