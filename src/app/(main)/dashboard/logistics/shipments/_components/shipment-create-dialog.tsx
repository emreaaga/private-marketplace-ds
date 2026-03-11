"use client";

import { useMemo, useState } from "react";

import { toast } from "sonner";

import { getClientUser } from "@/features/auth/get-user";
import { useCreateShipment } from "@/features/shipments/queries/use-create-shipment";
import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import { cn } from "@/shared/lib/utils";
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
  // 1. Получаем данные пользователя
  const user = useMemo(() => getClientUser(), []);
  const isAdmin = user?.company_type === "platform";

  const [companyId, setCompanyId] = useState<number | undefined>();
  const [origin, setOrigin] = useState<LocationValue>({ country: null, city: null });
  const [destination, setDestination] = useState<LocationValue>({ country: null, city: null });
  const [errors, setErrors] = useState<Errors>({});

  const createMutation = useCreateShipment();

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

    // Валидируем выбор компании только если пользователь — админ
    if (isAdmin && !companyId) {
      nextErrors.companyId = true;
    }

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

    // 2. Определяем финальный ID компании
    // Если админ — берем из стейта, если нет — берем ID компании из профиля юзера
    const finalCompanyId = isAdmin ? companyId : user?.company_id;

    if (!finalCompanyId) {
      toast.error("Ошибка: ID компании не определен");
      return;
    }

    createMutation.mutate(
      {
        company_id: finalCompanyId,
        from_country: origin.country!,
        to_country: destination.country!,
      },
      {
        onSuccess: () => {
          resetForm();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) resetForm();
        onOpenChange(next);
      }}
    >
      <DialogContent className="border-border/40 overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-100">
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="text-[16px] font-bold tracking-tight">Новая отправка</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 px-4 py-2">
          {/* 3. Условный рендеринг выбора компании */}
          {isAdmin && (
            <div className="space-y-1">
              <CompanySelect
                placeholder="Выберите почту..."
                type="postal"
                value={companyId}
                error={!!errors.companyId}
                onChange={(v) => {
                  setCompanyId(v);
                  clearError("companyId");
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className={cn("rounded-xl transition-all", errors.origin && "ring-destructive/20 ring-2")}>
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

            <div className={cn("rounded-xl transition-all", errors.destination && "ring-destructive/20 ring-2")}>
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
        </div>

        <div className="bg-muted/5 border-border/40 mt-3 flex justify-end gap-2 border-t px-4 py-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={createMutation.isPending}
            className="border-border/40 h-8 rounded-lg px-3 text-[12px]"
          >
            Отмена
          </Button>

          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={createMutation.isPending}
            className="bg-foreground text-background hover:bg-foreground/90 h-8 rounded-lg px-4 text-[12px] font-bold transition-all active:scale-[0.98]"
          >
            {createMutation.isPending ? "Создание..." : "Создать отправку"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
