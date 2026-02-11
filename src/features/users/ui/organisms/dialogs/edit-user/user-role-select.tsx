"use client";

import { USER_ROLE_META } from "@/shared/types/users/user.meta";
import type { UserRoles } from "@/shared/types/users/user.model";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

export function UserRoleSelect({
  value,
  onChange,
  placeholder = "Роль",
}: {
  value?: UserRoles;
  onChange: (value: UserRoles) => void;
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as UserRoles)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {(Object.keys(USER_ROLE_META) as UserRoles[]).map((role) => {
          const meta = USER_ROLE_META[role];
          const Icon = meta.Icon;

          return (
            <SelectItem key={role} value={role} disabled={!!meta.disabled}>
              <div className="flex items-center gap-2">
                <Icon className="text-muted-foreground h-4 w-4" />
                <span>{meta.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
