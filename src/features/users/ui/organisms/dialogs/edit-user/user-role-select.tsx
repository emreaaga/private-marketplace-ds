"use client";

import { USER_ROLE_META } from "@/shared/types/users/user.meta";
import type { UserRoles } from "@/shared/types/users/user.model";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/atoms/select";

export function UserRoleSelect({
  value,
  onChangeAction,
  placeholder = "Роль",
}: {
  value?: UserRoles;
  onChangeAction: (value: UserRoles) => void;
  placeholder?: string;
}) {
  const meta = value ? USER_ROLE_META[value] : null;
  const Icon = meta?.Icon;

  return (
    <Select value={value} onValueChange={(v) => onChangeAction(v as UserRoles)}>
      <SelectTrigger className="w-full">
        {meta && Icon ? (
          <div className="flex items-center gap-2">
            <Icon className="text-muted-foreground h-4 w-4" />
            <span>{meta.label}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </SelectTrigger>

      <SelectContent>
        {(Object.keys(USER_ROLE_META) as UserRoles[]).map((role) => {
          const itemMeta = USER_ROLE_META[role];
          const ItemIcon = itemMeta.Icon;

          const disabled = !!itemMeta.disabled && role !== value;

          return (
            <SelectItem key={role} value={role} disabled={disabled} textValue={itemMeta.label}>
              <div className="flex items-center gap-2">
                <ItemIcon className="text-muted-foreground h-4 w-4" />
                <span>{itemMeta.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
