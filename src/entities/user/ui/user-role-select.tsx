"use client";

import { forwardRef } from "react";

import { FORM_FIELD_STYLES, getFieldStatusClass } from "@/shared/config/form-styles";
import { cn } from "@/shared/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import { USER_ROLE_META } from "../model/user.meta";
import { type UserRoles } from "../model/user.model";

interface UserRoleSelectProps {
  value: UserRoles;
  onChange: (value: UserRoles) => void;
  error?: boolean;
  isDirty?: boolean;
  disabled?: boolean;
  className?: string;
}

export const UserRoleSelect = forwardRef<HTMLButtonElement, UserRoleSelectProps>(
  ({ value, onChange, error, isDirty, disabled, className }, ref) => {
    return (
      <Select value={value} onValueChange={(v) => onChange(v as UserRoles)} disabled={disabled}>
        <SelectTrigger ref={ref} className={cn(FORM_FIELD_STYLES.base, getFieldStatusClass(error, isDirty), className)}>
          <SelectValue placeholder="Выберите роль" />
        </SelectTrigger>

        <SelectContent className="border-muted/40 rounded-xl shadow-xl">
          {Object.entries(USER_ROLE_META).map(([role, meta]) => {
            const Icon = meta.Icon;
            return (
              <SelectItem key={role} value={role} disabled={meta.disabled} className="focus:bg-accent rounded-lg py-2">
                <div className="flex items-center gap-2.5">
                  <Icon className="text-muted-foreground/70 h-3.5 w-3.5" />
                  <span className="text-sm">{meta.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  },
);

UserRoleSelect.displayName = "UserRoleSelect";
