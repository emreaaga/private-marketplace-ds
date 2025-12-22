"use client";

import { DollarSign, Package } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import type { ProductFormValues } from "@/features/seller/types/product-form.types";
import { FormField, FormItem, FormMessage, FormControl } from "@/shared/ui/atoms/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";

interface ProductMetaSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

export function ProductResultSection({ form }: ProductMetaSectionProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <FormField
        control={form.control}
        name="quantity"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <InputGroup>
                <InputGroupInput {...field} readOnly type="number" className="w-full pl-9" />
                <InputGroupAddon>
                  <Package />
                </InputGroupAddon>
              </InputGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="total_amount"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <InputGroup>
                <InputGroupInput {...field} readOnly type="number" className="w-full pl-9" />
                <InputGroupAddon>
                  <DollarSign />
                </InputGroupAddon>
              </InputGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
