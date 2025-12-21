"use client";

import { SUB_CATEGORY_LIST } from "@/features/products/fake-products";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

interface SubCategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SubCategorySelect({ value, onChange }: SubCategorySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-10 w-full">
        <SelectValue placeholder="Выберите подкатегорию" />
      </SelectTrigger>

      <SelectContent>
        {SUB_CATEGORY_LIST.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
