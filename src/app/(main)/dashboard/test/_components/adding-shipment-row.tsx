"use client";

import { useState } from "react";

import { X } from "lucide-react";

import { useAvailableShipments } from "@/features/shipments/queries/use-shipments-lookup";
import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

interface AddingShipmentRowProps {
  onCancelAction: () => void;
  onSelectAction: (
    id: number,
    meta: {
      name: string;
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
  const { data: shipments = [], isLoading } = useAvailableShipments(companyId);

  return (
    <div className="bg-primary/5 animate-in fade-in slide-in-from-top-1 border-primary/20 flex h-6.5 items-center gap-1 border-b border-dashed px-1">
      {/* Кнопка отмены */}
      <button
        type="button"
        onClick={onCancelAction}
        className="text-muted-foreground hover:text-destructive shrink-0 p-1 transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="flex h-full w-32.5 shrink-0 items-center">
        <CompanySelect
          type="postal"
          placeholder="Фирма..."
          value={companyId}
          onChange={setCompanyId}
          onSelectName={setCompanyName}
          className="h-full min-h-0 border-none bg-transparent px-1 py-0 text-[10px] shadow-none focus:ring-0 [&>svg]:h-3 [&>svg]:w-3"
        />
      </div>

      <div className="bg-primary/20 h-4 w-px" />

      <div className="flex h-full min-w-0 flex-1 items-center">
        <Select
          value=""
          onValueChange={(val) => {
            const s = shipments.find((x) => x.id === Number(val));
            if (s) {
              onSelectAction(s.id, {
                name: companyName,
                weight: s.total_weight_kg,
                prepaid: s.total_prepaid,
                remaining: s.total_remaining,
              });
            }
          }}
          disabled={!companyId || isLoading}
        >
          <SelectTrigger className="h-full min-h-0 border-none bg-transparent px-1 py-0 text-[10px] shadow-none focus:ring-0 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:opacity-50">
            <SelectValue placeholder={isLoading ? "..." : "Выбор отправки..."} />
          </SelectTrigger>

          <SelectContent>
            {shipments.length === 0 ? (
              <div className="text-muted-foreground p-1 text-center text-xs">
                {companyId ? "Нет доступных" : "Сначала выберите фирму"}
              </div>
            ) : (
              shipments.map((s) => (
                <SelectItem
                  key={s.id}
                  value={String(s.id)}
                  disabled={excludeIds.includes(s.id)}
                  className="py-1 text-[10px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold">#{s.number || s.id}</span>

                    <span className="text-muted-foreground/40 text-[9px]">|</span>

                    <span className="text-muted-foreground">{s.orders_count} зак.</span>

                    <span className="text-muted-foreground/40 text-[9px]">|</span>

                    <span className="font-medium">{Number(s.total_weight_kg).toFixed(1)} кг</span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
