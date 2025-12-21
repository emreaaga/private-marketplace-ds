"use client";

import { useEffect } from "react";

import { type UseFormReturn, useWatch } from "react-hook-form";

import type { ProductFormValues } from "@/features/products/types/product-form.types";
import { FormField, FormItem, FormMessage, FormControl } from "@/shared/ui/atoms/form";
import { NumberStepper } from "@/shared/ui/molecules/number-stepper";

import { SizesMultiSelect } from "../../molecules/create-form/sizes-multi-select";

interface ProductMetaSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

export function ProductMetaSection({ form }: ProductMetaSectionProps) {
  const sizes = useWatch({ control: form.control, name: "sizes" });
  const countOfSeries = useWatch({ control: form.control, name: "count_of_series" });
  const price = useWatch({ control: form.control, name: "price" });

  useEffect(() => {
    const seriesCount = Number(countOfSeries) || 0;

    const sizesTotal = sizes.reduce((acc, s) => acc + Math.max(0, s.quantity), 0);

    const quantity = seriesCount * sizesTotal;
    const total = quantity * (Number(price) || 0);

    form.setValue("quantity", quantity, {
      shouldDirty: true,
      shouldValidate: true,
    });

    form.setValue("total_amount", total, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [sizes, countOfSeries, price, form]);

  return (
    <div className="flex w-full flex-col gap-4">
      <FormField
        control={form.control}
        name="sizes"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <SizesMultiSelect value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="count_of_series"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <NumberStepper
                value={Number(field.value) || 1}
                min={1}
                step={1}
                placeholder="Количество серий"
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <NumberStepper
                value={Number(field.value) || 0}
                min={0}
                step={1}
                placeholder="Цена"
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
