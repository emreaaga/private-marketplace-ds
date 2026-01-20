"use client";

import { useState, useCallback } from "react";

import dynamic from "next/dynamic";

import { ListFilter, Search, SlidersHorizontal, RotateCcw } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { IconButton } from "@/shared/ui/molecules/icon-button";

import { CreateDropdown } from "../create-dropdown";

const CreateUserDialog = dynamic(() => import("../forms/create-user-dialog"), { ssr: false });
const CreateCompanyDialog = dynamic(() => import("../forms/create-company-dialog"), { ssr: false });

export function UsersToolbar() {
  const [dialog, setDialog] = useState<"user" | "company" | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const handleUserDialogChange = (open: boolean) => {
    if (!open) {
      setDialog(null);
    }
  };

  const handleCompanyDialogChange = (open: boolean) => {
    if (!open) {
      setDialog(null);
    }
  };

  const preload = useCallback(() => {
    setShouldLoad(true);
  }, []);

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

          <CreateDropdown
            onPreload={preload}
            onCreateUser={() => setDialog("user")}
            onCreateCompany={() => setDialog("company")}
          />
        </div>

        <div className="flex w-full gap-2 md:w-auto md:justify-end">
          <IconButton Icon={SlidersHorizontal} label="Сортировка" />
          <IconButton Icon={ListFilter} label="Фильтры" />
          <IconButton Icon={RotateCcw} label="Сбросить" />
        </div>
      </div>

      {(dialog === "user" || shouldLoad) && (
        <CreateUserDialog open={dialog === "user"} onOpenChange={handleUserDialogChange} />
      )}

      {(dialog === "company" || shouldLoad) && (
        <CreateCompanyDialog open={dialog === "company"} onOpenChange={handleCompanyDialogChange} />
      )}
    </>
  );
}
