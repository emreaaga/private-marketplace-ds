"use client";

import { useId, useMemo, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { CountryCode } from "@/entities/geography";
import type { ServicePrice } from "@/entities/service/model/services.pricing";
import type { ServiceType } from "@/entities/service/model/services.types";
import { useServicesLookup } from "@/entities/service/queries/use-services-lookup";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/atoms/popover";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

import type { CompanyType } from "../model/company.types";
import { useCompaniesLookup } from "../queries/use-companies-lookup";

function money2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "—";
}

export type CompanyServiceValue = {
  companyId: number | null;
  serviceId: number | null;
};

type CompanyServicePopoverSelectProps = {
  value: CompanyServiceValue;
  // Возвращаем объект и цену отдельно, чтобы было удобно сетать в react-hook-form
  onChangeAction: (value: CompanyServiceValue, price?: number) => void;
  companyType?: CompanyType;
  serviceType?: ServiceType;
  pricingType?: ServicePrice;
  country?: CountryCode;
  placeholder?: string;
  className?: string;
  enabled?: boolean;
};

// eslint-disable-next-line complexity
export function CompanyServicePopoverSelect({
  value,
  onChangeAction,
  companyType = "air_partner",
  serviceType = "flight",
  pricingType = "per_kg",
  country,
  placeholder = "Выберите партнёра и услугу",
  className,
  enabled = true,
}: CompanyServicePopoverSelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"company" | "service">("company");

  // 1. Загрузка компаний
  const { data: companies = [], isLoading: isLoadingCompanies } = useCompaniesLookup({
    type: companyType,
    country,
    enabled,
  });

  // 2. Загрузка услуг (только если выбрана компания)
  const { data: services = [], isFetching: isFetchingServices } = useServicesLookup({
    company_id: value.companyId ?? undefined,
    type: serviceType,
    pricing_type: pricingType,
  });

  const selectedCompany = useMemo(() => companies.find((c) => c.id === value.companyId), [companies, value.companyId]);

  const selectedService = useMemo(() => services.find((s) => s.id === value.serviceId), [services, value.serviceId]);

  const resetToCompany = () => setStep("company");

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (!enabled) return;
        setOpen(next);
        if (next) {
          // Умное открытие: если нет компании - показываем их. Если компания есть, но нет услуги - показываем услуги.
          if (!value.companyId) setStep("company");
          else if (!value.serviceId) setStep("service");
          else setStep("company");
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={!enabled}
          className={cn(
            "flex w-full items-center justify-between gap-2 px-3 py-2 text-sm font-normal transition-all",
            "bg-background border-input hover:bg-accent/50 hover:border-accent-foreground/20 shadow-sm",
            !enabled && "cursor-not-allowed bg-zinc-50 opacity-60",
            className,
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {selectedCompany ? (
              <>
                <span className="truncate font-medium">{selectedCompany.name}</span>
                {selectedService && (
                  <>
                    <span className="text-muted-foreground/70 mx-1">/</span>
                    <span className="truncate">${money2(selectedService.price)}/кг</span>
                  </>
                )}
              </>
            ) : (
              <span className="text-muted-foreground/60">{placeholder}</span>
            )}
          </div>
          <ChevronRight
            className={cn("text-muted-foreground/50 h-3.5 w-3.5 transition-transform", open && "rotate-90")}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="border-muted/40 flex max-h-100 w-60 flex-col overflow-hidden rounded-xl p-0 shadow-xl"
        align="start"
      >
        {/* HEADER */}
        <div className="bg-muted/20 flex shrink-0 items-center justify-between border-b px-3 py-2">
          <span className="text-muted-foreground/80 text-[11px] font-medium tracking-wider uppercase">
            {step === "company" ? "Выберите компанию" : "Выберите услугу"}
          </span>
          {step === "service" && (
            <button onClick={resetToCompany} className="hover:bg-muted rounded-md p-1 transition-colors">
              <ChevronLeft className="h-3 w-3" />
            </button>
          )}
        </div>

        <ScrollArea className="w-full flex-1 overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
          <div
            key={step}
            className="animate-in fade-in-0 slide-in-from-bottom-1 flex flex-col p-1 pr-3 duration-200 ease-out"
          >
            {step === "company" && (
              <ul className="space-y-0.5">
                {isLoadingCompanies ? (
                  <div className="py-6 text-center text-[12px] font-medium text-zinc-400">Загрузка...</div>
                ) : companies.length === 0 ? (
                  <div className="py-6 text-center text-[12px] font-medium text-zinc-400">Компании не найдены</div>
                ) : (
                  companies.map((company) => (
                    <li key={company.id}>
                      <Button
                        type="button"
                        variant="ghost"
                        className="hover:bg-accent/80 group h-9 w-full justify-between rounded-lg px-2 py-1.5 text-sm font-normal"
                        onClick={() => {
                          onChangeAction({ companyId: company.id, serviceId: null });
                          setStep("service");
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[10px] font-medium tracking-tighter text-zinc-400">
                            {String(company.id).padStart(3, "0")}
                          </span>
                          <span className="text-foreground/90 truncate">{company.name}</span>
                        </div>
                        <ChevronRight className="text-muted-foreground/0 group-hover:text-muted-foreground/50 h-3 w-3 transition-all" />
                      </Button>
                    </li>
                  ))
                )}
              </ul>
            )}

            {step === "service" && value.companyId && (
              <ul className="space-y-0.5">
                {isFetchingServices ? (
                  <div className="py-6 text-center text-[12px] font-medium text-zinc-400">Загрузка...</div>
                ) : services.length === 0 ? (
                  <div className="py-6 text-center text-[12px] font-medium text-zinc-400">Нет услуг</div>
                ) : (
                  services.map((service) => (
                    <li key={service.id}>
                      <Button
                        type="button"
                        variant="ghost"
                        className="hover:bg-accent/80 h-9 w-full justify-start rounded-lg px-2 py-1.5 text-sm font-normal"
                        onClick={() => {
                          onChangeAction({ companyId: value.companyId, serviceId: service.id }, service.price);
                          setOpen(false);
                        }}
                      >
                        <span className="truncate">${money2(service.price)} / кг</span>
                      </Button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
