"use client";

import { useMemo } from "react";

import { useForm } from "react-hook-form";

import { useServiceDetail } from "@/entities/service/queries/use-service-detail";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

import { SERVICE_EDIT_EMPTY, type ServiceEditFormValues } from "../model/service-edit.types";

import { ServiceEditForm } from "./service-edit-form";

type Props = {
  open: boolean;
  serviceId: number | null;
  onOpenChangeAction: (open: boolean) => void;
  onSubmitAction: (id: number, values: ServiceEditFormValues) => Promise<unknown>;
};

export function ServiceEditDialog({ open, serviceId, onOpenChangeAction, onSubmitAction }: Props) {
  const isEnabled = open && serviceId !== null;
  const { data: service, isLoading, isError } = useServiceDetail(serviceId, isEnabled);

  const normalizedData = useMemo(() => {
    if (!service) return SERVICE_EDIT_EMPTY;
    return {
      type: service.type,
      pricing_type: service.pricing_type,
      price: Number(service.price) || 0,
      is_active: !!service.is_active,
    };
  }, [service]);

  const form = useForm<ServiceEditFormValues>({
    defaultValues: SERVICE_EDIT_EMPTY,
    values: open && service ? normalizedData : SERVICE_EDIT_EMPTY,
  });

  const handleInternalSubmit = async (values: ServiceEditFormValues) => {
    if (serviceId === null) return;
    await onSubmitAction(serviceId, values);
    onOpenChangeAction(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>{isLoading ? "Загрузка..." : `Услуга #${serviceId}`}</DialogTitle>
        </DialogHeader>

        {isError && <div className="text-destructive py-4 text-center text-sm">Ошибка загрузки</div>}

        {!isError && service && <ServiceEditForm form={form} service={service} onSubmit={handleInternalSubmit} />}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="secondary" size="sm" onClick={() => onOpenChangeAction(false)}>
            Отмена
          </Button>
          <Button
            type="submit"
            form="service-edit-form"
            size="sm"
            disabled={isLoading || isError || form.formState.isSubmitting || !form.formState.isDirty}
          >
            {form.formState.isSubmitting ? "Сохранение..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
