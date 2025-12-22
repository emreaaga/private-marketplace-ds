"use client";

import type { UseFormReturn } from "react-hook-form";

import type { ProductFormValues } from "@/features/products/types/product-form.types";
import { FormField, FormItem, FormMessage, FormControl } from "@/shared/ui/atoms/form";

import { CategorySelect } from "../../molecules/create-form/category-select";
import { SubCategorySelect } from "../../molecules/create-form/subcategories-select";

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
