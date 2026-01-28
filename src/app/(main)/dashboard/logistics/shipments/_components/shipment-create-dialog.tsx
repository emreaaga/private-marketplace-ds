"use client";

import { useState } from "react";

import { toast } from "sonner";

import { ShipmentsService } from "@/features/shipments/api/shipment";
import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

type LocationValue = {
  country: CountryCode | null;
  city: string | null;
};

type Errors = {
  companyId?: true;
  origin?: true;
  destination?: true;
};

interface ShipmentCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShipmentCreateDialog({ open, onOpenChange }: ShipmentCreateDialogProps) {
  const [companyId, setCompanyId] = useState<number | undefined>();

  const [origin, setOrigin] = useState<LocationValue>({
    country: null,
    city: null,
  });

  const [destination, setDestination] = useState<LocationValue>({
    country: null,
    city: null,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setCompanyId(undefined);
    setOrigin({ country: null, city: null });
    setDestination({ country: null, city: null });
    setErrors({});
  };

  const clearError = (field: keyof Errors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Errors = {};

    if (!companyId) nextErrors.companyId = true;
    if (!origin.country) nextErrors.origin = true;
    if (!destination.country) nextErrors.destination = true;

    if (origin.country && destination.country && origin.country === destination.country) {
      nextErrors.origin = true;
      nextErrors.destination = true;
      toast.error("Страны не могут быть одинаковыми");
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      await ShipmentsService.createShipment({
        company_id: companyId!,
        from_country: origin.country!,
        to_country: destination.country!,
      });

      toast.success("Отправка успешно создана");

      resetForm();
      onOpenChange(false);
    } catch {
      toast.error("Не удалось создать отправку");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) resetForm();
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Создать отправку</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2">
            <CompanySelect
              placeholder="Почта"
              type="postal"
              value={companyId}
              error={!!errors.companyId}
              onChange={(v) => {
                setCompanyId(v);
                clearError("companyId");
              }}
            />
          </div>

          <div className={errors.origin ? "border-destructive rounded-md border" : ""}>
            <CountryCityPopoverSelect
              value={origin}
              onChange={(v) => {
                setOrigin(v);
                clearError("origin");
              }}
              mode="country-only"
              placeholder="Откуда"
            />
          </div>

          <div className={errors.destination ? "border-destructive rounded-md border" : ""}>
            <CountryCityPopoverSelect
              value={destination}
              onChange={(v) => {
                setDestination(v);
                clearError("destination");
              }}
              mode="country-only"
              placeholder="Куда"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>

          <Button size="sm" onClick={handleSubmit} disabled={isSubmitting}>
            Создать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
