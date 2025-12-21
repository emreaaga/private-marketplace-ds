"use client";

import { useState } from "react";

import { ALL_SIZES } from "@/features/products/fake-products";
import { SizeWithQuantity } from "@/features/products/types/product-form.types";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { QuantityStepper } from "@/shared/ui/molecules/quantity-stepper";

interface SizesMultiSelectProps {
  value: SizeWithQuantity[];
  onChange: (value: SizeWithQuantity[]) => void;
}

export function SizesMultiSelect({ value, onChange }: SizesMultiSelectProps) {
  const [open, setOpen] = useState(false);

  const isSelected = (size: string) => value.some((v) => v.size === size);

  const getQuantity = (size: string) => value.find((v) => v.size === size)?.quantity ?? 1;

  const toggleSize = (size: string) => {
    if (isSelected(size)) {
      onChange(value.filter((v) => v.size !== size));
    } else {
      onChange([...value, { size, quantity: 1 }]);
    }
  };

  const totalQuantity = value.reduce((acc, v) => acc + v.quantity, 0);

  const formatSelected = () => {
    if (value.length === 0) return "Выбрать размеры";

    if (value.length <= 8) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((v) => (
            <Badge key={v.size} variant="outline" className="px-0.5 py-0.5 text-[10px]">
              {v.size}/{v.quantity}
            </Badge>
          ))}
        </div>
      );
    }

    return `${value.length} выбрано`;
  };

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        className="w-full justify-between bg-transparent text-sm font-normal"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="text-muted-foreground truncate">{formatSelected()}</span>

          {totalQuantity > 0 && (
            <span className="bg-muted/60 text-foreground/70 rounded px-1 text-[10px] font-medium">
              ×{totalQuantity}
            </span>
          )}
        </span>
      </Button>

      {open && (
        <div className="bg-popover absolute z-50 mt-2 w-full rounded-md border shadow-md">
          <div className="flex flex-col gap-1">
            {ALL_SIZES.map((size) => {
              const checked = isSelected(size);

              return (
                <div
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-sm px-2 py-1 transition-colors",
                    checked ? "bg-accent" : "hover:bg-accent/50",
                  )}
                >
                  <span className="min-w-[60px] text-sm">{size}</span>
                  <div
                    className={cn(
                      "ml-auto transition-opacity",
                      checked ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                  >
                    <QuantityStepper
                      value={getQuantity(size)}
                      min={1}
                      size="sm"
                      stopPropagation
                      onChange={(next) => onChange(value.map((v) => (v.size === size ? { ...v, quantity: next } : v)))}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {value.length > 0 && (
            <div className="text-muted-foreground border-t px-3 py-2 text-xs">
              Выбрано размеров: {value.length} | Всего единиц: {totalQuantity}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
