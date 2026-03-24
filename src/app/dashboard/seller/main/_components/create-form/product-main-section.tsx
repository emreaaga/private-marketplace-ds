"use client";

import type { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage } from "@/shared/ui/atoms/form";

import type { ProductFormValues } from "../types/product-form.types";

import { CategorySelect } from "./category-select";
import { SubCategorySelect } from "./subcategories-select";

interface ProductMainSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

export function ProductMainSection({ form }: ProductMainSectionProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <CategorySelect value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sub_category"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <SubCategorySelect value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
