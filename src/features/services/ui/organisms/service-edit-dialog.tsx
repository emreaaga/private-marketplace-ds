"use client";

import { useMemo } from "react";

import { Building2, Calendar, DollarSign } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { useServiceDetail } from "@/features/services/queries/use-service-detail";
import { ServicePrice } from "@/shared/types/services/services.pricing";
import { SERVICE_PRICING_META } from "@/shared/types/services/services.pricing.meta";
import { ServiceType } from "@/shared/types/services/services.types";
import { SERVICE_TYPE_META } from "@/shared/types/services/services.types.meta";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { Switch } from "@/shared/ui/atoms/switch";

export type FormValues = {
  type: ServiceType;
  pricing_type: ServicePrice;
  price: number;
  is_active: boolean;
};

const EMPTY: FormValues = {
  type: "" as ServiceType,
  pricing_type: "" as ServicePrice,
  price: 0,
  is_active: true,
};

type Props = {
  open: boolean;
  serviceId: number | null;
  onOpenChangeAction: (open: boolean) => void;
  onSubmitAction: (id: number, values: FormValues) => Promise<unknown>;
};

// eslint-disable-next-line complexity
export function ServiceEditDialog({ open, serviceId, onOpenChangeAction, onSubmitAction }: Props) {
  const isEnabled = open && serviceId !== null;
  const { data: service, isLoading, isError } = useServiceDetail(serviceId, isEnabled);

  const normalizedData = useMemo<FormValues>(() => {
    if (!service) return EMPTY;
    return {
      type: service.type,
      pricing_type: service.pricing_type,
      price: Number(service.price) || 0,
      is_active: !!service.is_active,
    };
  }, [service]);

  const form = useForm<FormValues>({
    defaultValues: EMPTY,
    values: open && service ? normalizedData : EMPTY,
  });

  const requestClose = () => {
    if (form.formState.isSubmitting) return;
    onOpenChangeAction(false);
  };

  const submit: SubmitHandler<FormValues> = async (values) => {
    if (serviceId === null) return;
    try {
      await onSubmitAction(serviceId, values);
      onOpenChangeAction(false);
    } catch (e) {
      console.error(e);
    }
  };

  const isSaveDisabled = isLoading || isError || form.formState.isSubmitting || !form.formState.isDirty;

  return (
    <Dialog open={open} onOpenChange={requestClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isLoading ? "Загрузка..." : `Услуга #${serviceId}`}</DialogTitle>
        </DialogHeader>

        {isError && <div className="text-destructive py-4 text-center text-sm">Ошибка загрузки</div>}

        {!isError && service && (
          <form id="service-edit-form" className="grid gap-4 py-4" onSubmit={form.handleSubmit(submit)}>
            <FloatingLabelInput label="Компания" value={service.company_name} disabled readOnly icon={Building2} />

            <Controller
              control={form.control}
              name="type"
              render={({ field }) => (
                <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Тип услуги" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SERVICE_TYPE_META).map(([key, { label, Icon }]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <Icon className="text-muted-foreground h-4 w-4" />
                          <span>{label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {/* Тариф (Select - оставляем как есть) */}
            <Controller
              control={form.control}
              name="pricing_type"
              render={({ field }) => (
                <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Тариф" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SERVICE_PRICING_META).map(([key, { label, Icon }]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <Icon className="text-muted-foreground h-4 w-4" />
                          <span>{label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {/* Цена (Используем FloatingLabelInput с иконкой доллара) */}
            <FloatingLabelInput
              label="Цена ($)"
              type="number"
              step="0.01" // Позволяет вводить дробные числа
              icon={DollarSign}
              {...form.register("price", { valueAsNumber: true })}
            />

            <div className="grid grid-cols-2 gap-3">
              {/* Активность */}
              <Controller
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <div className="flex items-center justify-between rounded-md border px-3 py-2">
                    <span className="text-xs font-medium">Активна</span>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </div>
                )}
              />

              {/* Дата создания (Disabled с иконкой календаря) */}
              <FloatingLabelInput
                label="Создана"
                value={new Date(service.created_at).toLocaleDateString("ru-RU")}
                disabled
                readOnly
                icon={Calendar}
              />
            </div>
          </form>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="secondary" size="sm" onClick={requestClose} disabled={form.formState.isSubmitting}>
            Отмена
          </Button>
          <Button type="submit" form="service-edit-form" size="sm" disabled={isSaveDisabled}>
            {form.formState.isSubmitting ? "Сохранение..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
