"use client";

import { Briefcase, Building2, ChevronDown, LucideIcon, Plus, User, UserCircle } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";

type CreateDropdownProps = {
  onCreateUserAction?: () => void;
  onHoverUserAction?: () => void;
  onCreateCompanyAction?: () => void;
  onHoverCompanyAction?: () => void;
  onCreateServiceAction?: () => void;
  onHoverServiceAction?: () => void;
};

interface DropdownItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  disabled?: boolean;
  className?: string;
}

export function CreateDropdown({
  onCreateUserAction,
  onHoverUserAction,
  onCreateCompanyAction,
  onHoverCompanyAction,
  onCreateServiceAction,
  onHoverServiceAction,
}: CreateDropdownProps) {
  const hasAnyAction = onCreateUserAction || onCreateCompanyAction || onCreateServiceAction;

  if (!hasAnyAction) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="primary">
          <Plus size={14} strokeWidth={3} />
          <span className="text-[12px] font-bold tracking-tight">Создать</span>
          <ChevronDown size={12} className="ml-0.5 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="border-border/40 bg-background/95 w-48 rounded-xl p-1 shadow-xl backdrop-blur-md"
      >
        {onCreateCompanyAction && (
          <DropdownItem
            onClick={onCreateCompanyAction}
            onMouseEnter={onHoverCompanyAction}
            icon={Building2}
            label="Фирма"
          />
        )}

        {onCreateUserAction && (
          <DropdownItem
            onClick={onCreateUserAction}
            onMouseEnter={onHoverUserAction}
            icon={User}
            label="Пользователь"
          />
        )}

        {onCreateServiceAction && (
          <DropdownItem
            onClick={onCreateServiceAction}
            onMouseEnter={onHoverServiceAction}
            icon={Briefcase}
            label="Услуга"
          />
        )}

        {(onCreateUserAction || onCreateCompanyAction) && onCreateServiceAction && (
          <div className="bg-border/40 my-1 h-px" />
        )}

        <DropdownItem disabled icon={UserCircle} label="Клиент" className="opacity-50" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownItem({ icon: Icon, label, onClick, onMouseEnter, disabled, className }: DropdownItemProps) {
  return (
    <DropdownMenuItem
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "group hover:bg-muted focus:bg-muted flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors",
        className,
      )}
    >
      <Icon
        size={14}
        strokeWidth={2}
        className="text-muted-foreground/40 group-hover:text-primary/70 group-focus:text-primary/70 transition-colors"
      />
      <span className="text-foreground/80 group-hover:text-foreground">{label}</span>
    </DropdownMenuItem>
  );
}
