"use client";

import React from "react";

import { Input } from "@/shared/ui/atoms/input";

export interface SearchEntity {
  id: string;
  name: string;
  phone?: string;
  city?: string;
}

interface EntitySearchProps<T extends SearchEntity> {
  label: string;
  placeholder: string;
  data: T[];
  value?: string;
  onChange?: (entity: T | null) => void;
}

export function EntitySearch<T extends SearchEntity>({
  label,
  placeholder,
  data,
  value,
  onChange,
}: EntitySearchProps<T>) {
  const [query, setQuery] = React.useState(value ?? "");
  const [entity, setEntity] = React.useState<T | null>(null);

  const handleChange = (v: string) => {
    setQuery(v);

    const found = data.find((e) => e.id.toLowerCase() === v.toLowerCase());
    setEntity(found ?? null);
    onChange?.(found ?? null);
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{label}</div>

      <Input placeholder={placeholder} value={query} onChange={(e) => handleChange(e.target.value)} />

      <div className="flex min-h-14 items-center rounded-md border px-3 py-2 text-sm">
        {entity ? (
          <div>
            <div className="font-medium">{entity.name}</div>

            {(entity.phone ?? entity.city) && (
              <div className="text-muted-foreground text-xs">
                {entity.phone}
                {entity.phone && entity.city ? " · " : ""}
                {entity.city}
              </div>
            )}
          </div>
        ) : query ? (
          <span className="text-muted-foreground text-xs">Не найдено</span>
        ) : (
          <span className="text-muted-foreground text-xs">Введите код</span>
        )}
      </div>
    </div>
  );
}
