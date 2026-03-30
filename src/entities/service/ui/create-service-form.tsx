"use client";

import { Check, DollarSign, Loader2 } from "lucide-react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input"; // Проверь путь импорта

import { CreateServicePayload } from "../api/create-service.api";
import { useServiceCreate } from "../queries/use-service-create";

import { ServicePricingSelect } from "./service-pricing-select";
import { ServiceTypeSelect } from "./service-type-select";

type CreateServiceValues = Omit<CreateServicePayload, "company_id">;

type Props = {
  companyId: number;
  onCloseAction: () => void;
};

export function CreateServiceForm({ companyId, onCloseAction }: Props) {
  const { mutate, isPending } = useServiceCreate();

  const methods = useForm<CreateServiceValues>({
    defaultValues: {
      type: "flight",
      pricing_type: "per_kg",
      price: "",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, register, reset } = methods;

  const watchedValues = useWatch({ control });

  const isValid =
    !!watchedValues.type &&
    !!watchedValues.pricing_type &&
    !!watchedValues.price &&
    !isNaN(Number(watchedValues.price));

  const onSubmit = (values: CreateServiceValues) => {
    if (!isValid) return;

    mutate(
      {
        ...values,
        company_id: companyId,
        price: values.price.toString(),
      },
      {
        onSuccess: () => {
          reset();
          onCloseAction();
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-muted/30 mb-4 flex flex-col gap-2 rounded-lg border border-dashed p-2 transition-all"
      >
        <div className="flex items-center justify-between px-1">
          <span className="text-foreground/70 text-[10px] font-bold tracking-wider uppercase">Новая услуга</span>

          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className={cn(
              "h-6 w-6 rounded-md transition-all",
              isValid && !isPending
                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                : "text-muted-foreground/40",
            )}
            disabled={!isValid || isPending}
          >
            {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-4 w-4" />}
          </Button>
        </div>

        <div className="grid grid-cols-[1fr_1fr_0.8fr] items-end gap-1.5">
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <ServiceTypeSelect
                value={field.value}
                onChange={field.onChange}
                disabled={isPending}
                className="h-8 px-2 text-[11px] shadow-none"
              />
            )}
          />

          <ServicePricingSelect disabled={isPending} />

          <FloatingLabelInput
            {...register("price", { required: true })}
            label="Цена"
            mode="decimal"
            icon={DollarSign}
            disabled={isPending}
            maxNumericValue={99999}
            className="bg-background/50 h-8 text-[12px] shadow-none"
          />
        </div>
      </form>
    </FormProvider>
  );
}
