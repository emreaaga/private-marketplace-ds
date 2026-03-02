"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { ListFilter, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { IconButton } from "@/shared/ui/molecules/icon-button";

import { CreateDropdown } from "../create-dropdown";

const loadUser = () => import("../forms/create-user-dialog");
const loadCompany = () => import("../../../../companies/ui/organisms/create-company-dialog");
const loadService = () => import("@/features/services/ui/organisms/create-service-dialog");

const CreateUserDialog = dynamic(loadUser, { ssr: false });
const CreateCompanyDialog = dynamic(loadCompany, { ssr: false });
const CreateServiceDialog = dynamic(loadService, { ssr: false });

type DialogType = "user" | "company" | "service" | null;

const DIALOGS = {
  user: CreateUserDialog,
  company: CreateCompanyDialog,
  service: CreateServiceDialog,
} as const;

export function UsersToolbar() {
  const [dialog, setDialog] = useState<DialogType>(null);

  const ActiveDialog = dialog ? DIALOGS[dialog] : null;

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
            onCreateUserAction={() => setDialog("user")}
            onHoverUserAction={loadUser}
            onCreateCompanyAction={() => setDialog("company")}
            onHoverCompanyAction={loadCompany}
            onCreateServiceAction={() => setDialog("service")}
            onHoverServiceAction={loadService}
          />
        </div>

        <div className="flex w-full gap-2 md:w-auto md:justify-end">
          <IconButton Icon={SlidersHorizontal} label="Сортировка" />
          <IconButton Icon={ListFilter} label="Фильтры" />
          <IconButton Icon={RotateCcw} label="Сбросить" />
        </div>
      </div>

      {ActiveDialog && (
        <ActiveDialog
          open={true}
          onOpenChange={(open: boolean) => {
            if (!open) setDialog(null);
          }}
        />
      )}
    </>
  );
}
