"use client";

import { PlusIcon, User, Building2, UserCircle, LucideTextSelection } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/atoms/dropdown-menu";

type CreateDropdownProps = {
  onCreateUser: () => void;
  onCreateCompany: () => void;
  onCreateService: () => void;
  onPreload?: () => void;
};

export function CreateDropdown({ onCreateUser, onCreateCompany, onCreateService, onPreload }: CreateDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="h-9 flex-1 md:flex-none" onMouseEnter={onPreload} onFocus={onPreload}>
          <PlusIcon className="h-4 w-4" />
          <span>Создать</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={onCreateCompany}>
          <Building2 className="mr-2 h-4 w-4" />
          Фирма
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onCreateUser}>
          <User className="mr-2 h-4 w-4" />
          Польз.
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onCreateCompany}>
          <UserCircle className="mr-2 h-4 w-4" />
          Клиент
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onCreateService}>
          <LucideTextSelection className="mr-2 h-4 w-4" />
          Услуга
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
