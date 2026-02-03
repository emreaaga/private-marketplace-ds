"use client";

import * as React from "react";

import { toast } from "sonner";

import { ShipmentsService } from "@/features/shipments/api/shipment";
import { clampScale } from "@/shared/lib/money";
import type { OrderSummaryForm } from "@/shared/types/order/order-summary.form";
import type { Shipment } from "@/shared/types/shipment/shipment.model";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

function Suffix({ value }: { value: string }) {
  return (
    <span className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs">
      {value}
    </span>
  );
}

function Field({ suffix, children }: { suffix?: string; children: React.ReactNode }) {
  return (
    <div className="relative flex-1">
      {children}
      {suffix && <Suffix value={suffix} />}
    </div>
  );
}

type Props = {
  value: OrderSummaryForm;
  onChangeAction: (patch: Partial<OrderSummaryForm>) => void;
  balance: string;
};

export function PartiesSummary({ value, onChangeAction, balance }: Props) {
  const [shipments, setShipments] = React.useState<Shipment[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);

    ShipmentsService.getShipments({ status: "draft" })
      .then((data) => {
        if (!cancelled) setShipments(data);
      })
      .catch(() => {
        if (!cancelled) {
          setShipments([]);
          toast.error("Не удалось загрузить отправки");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex w-full items-center gap-2">
      <Select
        value={value.shipment_id ?? undefined}
        onValueChange={(v) => onChangeAction({ shipment_id: v })}
        disabled={loading}
      >
        <SelectTrigger className="h-8 w-56 text-xs">
          <SelectValue placeholder={loading ? "Загрузка..." : "Отправка"} />
        </SelectTrigger>

        <SelectContent>
          {!loading && shipments.length === 0 ? (
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

      <Field suffix="кг">
        <Input
          className="h-8 min-w-[100px] px-2 pr-8 text-xs"
          placeholder="Вес"
          inputMode="decimal"
          value={value.weight_kg}
          onChange={(e) => onChangeAction({ weight_kg: clampScale(e.target.value, 2) })}
        />
      </Field>

      <Field suffix="$/кг">
        <Input
          className="h-8 min-w-[100px] px-2 pr-10 text-xs"
          placeholder="Ставка"
          inputMode="decimal"
          value={value.rate_per_kg}
          onChange={(e) => onChangeAction({ rate_per_kg: clampScale(e.target.value, 2) })}
        />
      </Field>

      <Field suffix="$">
        <Input
          className="h-8 min-w-[110px] px-2 pr-8 text-xs"
          placeholder="Доп. оплата"
          inputMode="decimal"
          value={value.extra_fee}
          onChange={(e) => onChangeAction({ extra_fee: clampScale(e.target.value, 2) })}
        />
      </Field>

      <Field suffix="$">
        <Input
          className="h-8 min-w-[100px] px-2 pr-8 text-xs"
          placeholder="Взнос"
          inputMode="decimal"
          value={value.deposit}
          onChange={(e) => onChangeAction({ deposit: clampScale(e.target.value, 2) })}
        />
      </Field>

      <Field suffix="$">
        <Input disabled className="h-8 min-w-[120px] px-2 pr-8 text-xs" placeholder="При получении" value={balance} />
      </Field>
    </div>
  );
}
