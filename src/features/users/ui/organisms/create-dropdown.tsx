"use client";

import { Building2, LucideTextSelection, PlusIcon, User, UserCircle } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";

type CreateDropdownProps = {
  onCreateUserAction: () => void;
  onHoverUserAction: () => void;
  onCreateCompanyAction: () => void;
  onHoverCompanyAction: () => void;
  onCreateServiceAction: () => void;
  onHoverServiceAction: () => void;
};

export function CreateDropdown({
  onCreateUserAction,
  onHoverUserAction,
  onCreateCompanyAction,
  onHoverCompanyAction,
  onCreateServiceAction,
  onHoverServiceAction,
}: CreateDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="h-9 flex-1 md:flex-none">
          <PlusIcon className="h-4 w-4" />
          <span>Создать</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={onCreateCompanyAction} onMouseEnter={onHoverCompanyAction}>
          <Building2 className="mr-2 h-4 w-4" />
          Фирма
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onCreateUserAction} onMouseEnter={onHoverUserAction}>
          <User className="mr-2 h-4 w-4" />
          Польз.
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onCreateServiceAction} onMouseEnter={onHoverServiceAction}>
          <LucideTextSelection className="mr-2 h-4 w-4" />
          Услуга
        </DropdownMenuItem>

        <DropdownMenuItem disabled>
          <UserCircle className="mr-2 h-4 w-4" />
          Клиент
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
