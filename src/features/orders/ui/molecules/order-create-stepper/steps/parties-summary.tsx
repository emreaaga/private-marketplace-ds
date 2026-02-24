"use client";

import * as React from "react";

import { useDraftShipments } from "@/features/shipments/queries/use-draft-shipments";
import { clampScale } from "@/shared/lib/money";
import type { OrderSummaryForm } from "@/shared/types/order/order-summary.form";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

function Suffix({ value, disabled }: { value: string; disabled?: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs ${
        disabled ? "text-muted-foreground/50" : "text-muted-foreground"
      }`}
    >
      {value}
    </span>
  );
}

function Field({ suffix, disabled, children }: { suffix?: string; disabled?: boolean; children: React.ReactNode }) {
  return (
    <div className="relative flex-1">
      {children}
      {suffix && <Suffix value={suffix} disabled={disabled} />}
    </div>
  );
}

type Props = {
  value: OrderSummaryForm;
  onChangeAction?: (patch: Partial<OrderSummaryForm>) => void; // Сделали опциональным
  balance: string;
  enabled?: boolean;
  readOnly?: boolean; // Добавили флаг режима просмотра
};

// eslint-disable-next-line complexity
export function PartiesSummary({ value, onChangeAction, balance, enabled = true, readOnly = false }: Props) {
  // В режиме readOnly можно даже не делать запрос за списком отправок,
  // если мы просто показываем текущее значение, но оставим логику enabled на усмотрение родителя
  const { data: shipments = [], isLoading, isError } = useDraftShipments(enabled && !readOnly);

  return (
    <div className="flex w-full items-center gap-2">
      <Select
        value={value.shipment_id ?? undefined}
        onValueChange={(v) => onChangeAction?.({ shipment_id: v })}
        disabled={readOnly || isLoading || isError} // Блокируем в режиме просмотра
      >
        <SelectTrigger className="h-8 w-56 text-xs">
          <SelectValue
            placeholder={isLoading && !readOnly ? "Загрузка..." : isError && !readOnly ? "Ошибка" : "Отправка"}
          />
        </SelectTrigger>

        <SelectContent>
          {!isLoading && shipments.length === 0 ? (
            <SelectItem value="__empty__" disabled>
              Нет отправок
            </SelectItem>
          ) : (
            shipments.map((s) => (
              <SelectItem key={s.id} value={String(s.id)}>
                {s.id} · {formatWeight(s.total_weight_kg)} · {formatQuantity(s.orders_count, { unit: "шт" })}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      <Field suffix="кг" disabled={readOnly}>
        <Input
          className="h-8 min-w-[100px] px-2 pr-8 text-xs disabled:opacity-70"
          placeholder="Вес"
          inputMode="decimal"
          value={value.weight_kg}
          onChange={(e) => onChangeAction?.({ weight_kg: clampScale(e.target.value, 2) })}
          disabled={readOnly}
        />
      </Field>

      <Field suffix="$/кг" disabled={readOnly}>
        <Input
          className="h-8 min-w-[100px] px-2 pr-10 text-xs disabled:opacity-70"
          placeholder="Ставка"
          inputMode="decimal"
          value={value.rate_per_kg}
          onChange={(e) => onChangeAction?.({ rate_per_kg: clampScale(e.target.value, 2) })}
          disabled={readOnly}
        />
      </Field>

      <Field suffix="$" disabled={readOnly}>
        <Input
          className="h-8 min-w-[110px] px-2 pr-8 text-xs disabled:opacity-70"
          placeholder="Доп. оплата"
          inputMode="decimal"
          value={value.extra_fee}
          onChange={(e) => onChangeAction?.({ extra_fee: clampScale(e.target.value, 2) })}
          disabled={readOnly}
        />
      </Field>

      <Field suffix="$" disabled={readOnly}>
        <Input
          className="h-8 min-w-[100px] px-2 pr-8 text-xs disabled:opacity-70"
          placeholder="Взнос"
          inputMode="decimal"
          value={value.deposit}
          onChange={(e) => onChangeAction?.({ deposit: clampScale(e.target.value, 2) })}
          disabled={readOnly}
        />
      </Field>

      <Field suffix="$" disabled={true}>
        {/* Баланс всегда disabled, но в readOnly чуть снижаем прозрачность для консистентности */}
        <Input
          disabled
          className="h-8 min-w-[120px] px-2 pr-8 text-xs disabled:opacity-70"
          placeholder="При получении"
          value={balance}
        />
      </Field>
    </div>
  );
}
