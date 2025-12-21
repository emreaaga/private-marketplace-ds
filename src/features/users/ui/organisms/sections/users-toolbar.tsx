import { ListFilter, Search, SlidersHorizontal, RotateCcw, PlusIcon } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";

import { CreateUserDialog } from "../forms/create-user-dialog";

function IconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex h-9 flex-1 items-center justify-center gap-2 p-0 md:flex-none md:px-3"
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Button>
  );
}

export function UsersToolbar() {
  return (
    <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full gap-2 md:max-w-xl md:flex-row">
        <InputGroup className="flex h-9 flex-1">
          <InputGroupInput placeholder="Поиск" className="h-9 flex-1" />
          <InputGroupAddon>
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>

        <CreateUserDialog>
          <Button size="sm" className="h-9 flex-1 md:flex-none">
            <PlusIcon className="h-4 w-4" />
            <span className="md:inline">Создать</span>
            <span className="hidden md:inline">пользователя</span>
          </Button>
        </CreateUserDialog>
      </div>

      <div className="flex w-full gap-2 md:w-auto md:justify-end">
        <IconButton icon={<SlidersHorizontal />} label="Сортировка" />
        <IconButton icon={<ListFilter />} label="Фильтры" />
        <IconButton icon={<RotateCcw />} label="Сбросить" />
      </div>
    </div>
  );
}
