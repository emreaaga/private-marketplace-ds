"use client";

import { useState } from "react";

import { Loader2, MoreHorizontal, Plus, Tag, X } from "lucide-react";

import { CreateServiceForm, SERVICE_PRICING_META, SERVICE_TYPE_META, useServicesList } from "@/entities/service";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";

interface CompanyServicesListProps {
  companyId: number | null;
}

// eslint-disable-next-line complexity
export function CompanyServicesList({ companyId }: CompanyServicesListProps) {
  const [isAdding, setIsAdding] = useState(false);

  const { data, isLoading, isError } = useServicesList({
    company_id: companyId ?? undefined,
    page: 1,
  });

  const services = data?.data || [];
  const total = data?.pagination.total || 0;

  const toggleAdding = () => setIsAdding((prev) => !prev);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-10">
        <Loader2 className="text-muted-foreground/30 h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-destructive py-10 text-center text-sm font-medium">Ошибка загрузки услуг</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
          Всего услуг — {total}
        </h3>

        {companyId && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 rounded-md transition-all",
              isAdding ? "bg-muted text-foreground" : "hover:bg-primary/10 hover:text-primary text-muted-foreground",
            )}
            onClick={toggleAdding}
            title={isAdding ? "Закрыть форму" : "Добавить услугу"}
          >
            {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {isAdding && companyId && <CreateServiceForm companyId={companyId} onCloseAction={() => setIsAdding(false)} />}

      {services.length === 0 && !isAdding ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
            <Tag className="text-muted-foreground/50 h-6 w-6" />
          </div>
          <p className="text-foreground text-sm font-medium">Услуг пока нет</p>
          <p className="text-muted-foreground text-xs">Нажмите на плюс, чтобы добавить первую</p>
        </div>
      ) : (
        <div className="divide-border/40 bg-background/50 divide-y rounded-lg border">
          {services.map((service) => {
            const isActive = service.is_active;
            const statusDisplayName = isActive ? "Активна" : "Неактивна";

            const typeMeta = SERVICE_TYPE_META[service.type];
            const ServiceIcon = typeMeta?.Icon || Tag;

            const pricingMeta = SERVICE_PRICING_META[service.pricing_type];
            const PricingIcon = pricingMeta?.Icon;

            return (
              <div
                key={service.id}
                className="group hover:bg-muted/40 flex items-center justify-between p-2.5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary text-muted-foreground flex h-8 w-8 items-center justify-center rounded-md border text-[13px] font-semibold">
                    <ServiceIcon />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[13px] leading-none font-medium tracking-tight">
                      {typeMeta?.label || service.type}
                    </span>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      {PricingIcon && <PricingIcon className="text-muted-foreground/50 h-3 w-3" />}
                      <span className="text-muted-foreground text-[11px] font-medium">
                        {service.price} $ / {pricingMeta?.label || service.pricing_type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn("h-1.5 w-1.5 shrink-0 rounded-full", isActive ? "bg-emerald-500" : "bg-red-500")}
                    />
                    <span className="text-foreground text-[13px] font-medium tracking-tight">{statusDisplayName}</span>
                  </div>

                  <button className="text-muted-foreground/30 hover:text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
