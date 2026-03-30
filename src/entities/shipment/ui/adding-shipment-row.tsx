"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { CompanySelect } from "@/entities/company";
import { cn } from "@/shared/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import { useShipmentsLookup } from "../queries/use-shipments-lookup";

interface AddingShipmentRowProps {
  onCancelAction: () => void;
  onSelectAction: (
    id: number,
    meta: {
      name: string;
      internalNumber: number;
      ordersCount: string;
      weight: number | unknown;
      prepaid: number | unknown;
      remaining: number | unknown;
    },
  ) => void;
  excludeIds: number[];
}

export function AddingShipmentRow({ onCancelAction, onSelectAction, excludeIds }: AddingShipmentRowProps) {
  const [companyId, setCompanyId] = useState<number | undefined>();
  const [companyName, setCompanyName] = useState<string>("");
  const { data: shipments = [], isLoading } = useShipmentsLookup(companyId);

  return (
    <div className="animate-in fade-in slide-in-from-top-1 grid h-8 grid-cols-[32px_50px_1fr_50px_70px_80px_80px_32px] items-center gap-3 border-b border-dashed border-zinc-200/60 bg-zinc-50/30 px-4">
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={onCancelAction}
          className="flex h-5 w-5 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-200/50 hover:text-zinc-800"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* Объединяем ячейки, чтобы уместить CompanySelect */}
      <div className="col-span-2 flex h-full min-w-0 items-center">
        <CompanySelect
          type="postal"
          placeholder="Фирма..."
          value={companyId}
          onChange={setCompanyId}
          onSelectName={setCompanyName}
          className="h-full w-full -translate-y-px border-none bg-transparent p-0 text-[11px] leading-none font-medium text-zinc-900 shadow-none focus:ring-0 [&>svg]:hidden"
        />
      </div>

      <div className="col-span-4 flex h-full min-w-0 items-center">
        <div className="mr-4 h-3 w-px shrink-0 bg-zinc-200" />

        <Select
          value=""
          onValueChange={(val) => {
            const s = shipments.find((x) => x.id === Number(val));
            if (s) {
              onSelectAction(s.id, {
                name: companyName,
                internalNumber: s.internal_number, // Передаем номер
                ordersCount: s.orders_count, // Передаем заказы
                weight: s.total_weight_kg,
                prepaid: s.total_prepaid,
                remaining: s.total_remaining,
              });
            }
          }}
          disabled={!companyId || isLoading}
        >
          <SelectTrigger className="flex h-full w-full -translate-y-px items-center border-none bg-transparent p-0 text-[11px] leading-none font-medium text-zinc-400 shadow-none focus:ring-0 [&>span]:truncate [&>svg]:h-3 [&>svg]:w-3 [&>svg]:opacity-30">
            <SelectValue placeholder={isLoading ? "..." : "Выбрать отправку..."} />
          </SelectTrigger>

          <SelectContent className="min-w-64">
            {/* Оставляем SelectContent без изменений, он и так красивый */}
            {shipments.length === 0 ? (
              <div className="p-3 text-center text-[10px] font-medium text-zinc-500">
                {companyId ? "Нет доступных грузов" : "Сначала выберите фирму"}
              </div>
            ) : (
              shipments.map((s) => (
                <SelectItem
                  key={s.id}
                  value={String(s.id)}
                  disabled={excludeIds.includes(s.id)}
                  className="py-1.5 text-[10px]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "font-bold transition-colors",
                        excludeIds.includes(s.id) ? "text-zinc-300" : "text-zinc-900",
                      )}
                    >
                      #{s.id}
                    </span>
                    <span className="text-zinc-400">|</span>
                    <span className="font-medium text-zinc-600">{s.orders_count} зак.</span>
                    <span className="text-zinc-400">|</span>
                    <span className="font-medium text-zinc-600">{s.total_weight_kg} кг</span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      <div />
    </div>
  );
}
