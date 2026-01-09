"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

interface Props {
  table: any;
}

export function DataTablePageSizeSelect({ table }: Props) {
  return (
    <Select
      value={`${table.getState().pagination.pageSize}`}
      onValueChange={(value) => table.setPageSize(Number(value))}
    >
      <SelectTrigger size="sm" className="w-20">
        <SelectValue />
      </SelectTrigger>

      <SelectContent side="bottom">
        {[10, 20, 30, 40].map((pageSize) => (
          <SelectItem key={pageSize} value={`${pageSize}`}>
            {pageSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
