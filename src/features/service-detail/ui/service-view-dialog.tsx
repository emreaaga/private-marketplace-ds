"use client";

import { useMemo } from "react";

import { ALL_COMPANY_TYPE_META } from "@/entities/company";
import { SERVICE_PRICING_META, SERVICE_TYPE_META } from "@/entities/service";
import { useServiceDetail } from "@/entities/service/queries/use-service-detail";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

type Props = {
  open: boolean;
  serviceId: number | null;
  onOpenChangeAction: (open: boolean) => void;
};

export function ServiceViewDialog({ open, serviceId, onOpenChangeAction }: Props) {
  const isEnabled = open && serviceId !== null;
  const { data: response, isLoading, isError } = useServiceDetail(serviceId, isEnabled);

  const service = response;

  const labels = useMemo(() => {
    if (!service) return { company: "", type: "", pricing: "" };

    return {
      company: service.company_type
        ? ALL_COMPANY_TYPE_META[service.company_type as keyof typeof ALL_COMPANY_TYPE_META]?.label
        : service.company_type,
      type: service.type ? SERVICE_TYPE_META[service.type as keyof typeof SERVICE_TYPE_META]?.label : service.type,
      pricing: service.pricing_type
        ? SERVICE_PRICING_META[service.pricing_type as keyof typeof SERVICE_PRICING_META]?.label
        : service.pricing_type,
    };
  }, [service]);

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            {isLoading ? "Загрузка..." : `Услуга #${serviceId}`}
          </DialogTitle>
        </DialogHeader>

        {isError && <div className="text-destructive py-6 text-center text-sm">Ошибка загрузки данных</div>}

        {!isError && service && (
          <div className="py-2">
            <div className="bg-muted/5 grid grid-cols-2 gap-x-4 gap-y-6 rounded-xl border p-5">
              <div className="space-y-1">
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Фирма</span>
                <div className="text-foreground text-sm font-medium">{service.company_name}</div>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Тип компании
                </span>
                <div className="text-foreground text-sm font-medium">{labels.company}</div>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Тип услуги
                </span>
                <div className="text-foreground text-sm font-medium">{labels.type}</div>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Тариф</span>
                <div className="text-foreground text-sm font-medium">{labels.pricing}</div>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Цена</span>
                <div className="text-foreground text-sm font-medium">${service.price}</div>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Статус</span>
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <div
                    className={cn("h-1.5 w-1.5 rounded-full", service.is_active ? "bg-emerald-500" : "bg-slate-400")}
                  />
                  <span className={service.is_active ? "text-emerald-700" : "text-slate-500"}>
                    {service.is_active ? "Активна" : "Пауза"}
                  </span>
                </div>
              </div>

              <div className="col-span-2 mt-2 border-t pt-4">
                <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                  Дата создания
                </span>
                <div className="text-foreground/80 mt-1 text-sm font-medium">
                  {/* Добавляем проверку для даты, на всякий случай */}
                  {service.created_at
                    ? new Date(service.created_at).toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => onOpenChangeAction(false)}>
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
