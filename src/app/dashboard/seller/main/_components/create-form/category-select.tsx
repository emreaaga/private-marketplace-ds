"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import { CATEGORY_LIST } from "../../_components/fake-products";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <Select disabled value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 w-full">
        <SelectValue placeholder="Выберите категорию" />
      </SelectTrigger>

      <SelectContent>
        {CATEGORY_LIST.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
