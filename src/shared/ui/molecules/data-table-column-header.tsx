import { Column } from "@tanstack/react-table";
import { ChevronsUpDown, EyeOff } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  isRoleFilter?: boolean;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  isRoleFilter,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="data-[state=open]:bg-accent -ml-3 h-8">
            <span>{title}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          {isRoleFilter && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => column.setFilterValue(undefined)}>Все роли</DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.setFilterValue("seller")}>Продавцы</DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.setFilterValue("customer")}>Клиенты</DropdownMenuItem>
            </>
          )}

          {column.columnDef.enableHiding !== false && (
            <>
              <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                <EyeOff className="text-muted-foreground/70 h-3.5 w-3.5" />
                Скрыть
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>A - Почта</DropdownMenuItem>
              <DropdownMenuItem>B - Продавец</DropdownMenuItem>
              <DropdownMenuItem>C - Клиент</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
