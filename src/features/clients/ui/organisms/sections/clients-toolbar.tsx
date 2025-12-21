import { ListFilter, Search, SlidersHorizontal, RotateCcw } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";

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

export function ClientsToolbar() {
  return (
    <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-col gap-2 md:max-w-xl md:flex-row">
        <InputGroup className="w-full md:flex-1">
          <InputGroupInput placeholder="Поиск клиентов" className="h-9" />
          <InputGroupAddon>
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex w-full justify-between gap-2 md:w-auto md:justify-end">
        <IconButton icon={<SlidersHorizontal />} label="Сортировка" />
        <IconButton icon={<ListFilter />} label="Фильтры" />
        <IconButton icon={<RotateCcw />} label="Сбросить" />
      </div>
    </div>
  );
}
