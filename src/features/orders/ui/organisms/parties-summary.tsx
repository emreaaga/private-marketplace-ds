"use client";

import { Scale, DollarSign, PlusCircle, Wallet, Calculator } from "lucide-react";

import { OrderSummaryForm } from "@/shared/types/order/order-summary.form";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";

import { ShipmentSelect } from "./shipment-select";

interface PartiesSummaryProps {
  value: OrderSummaryForm;
  onChange: (patch: Partial<OrderSummaryForm>) => void;
}

export function PartiesSummary({ value, onChange }: PartiesSummaryProps) {
  const total = Number(value.weight_kg || 0) * Number(value.rate_per_kg || 0) + Number(value.extra_fee || 0);
  const balance = total - Number(value.deposit || 0);

  const handleFormatChange = (key: keyof OrderSummaryForm, val: string) => {
    const sanitized = val.replace(",", ".").replace(/[^\d.]/g, "");
    onChange({ [key]: sanitized });
  };

  return (
    <div className="grid grid-cols-6 items-end gap-2 py-2">
      <ShipmentSelect value={value.shipment_id} onChange={(id) => onChange({ shipment_id: id.toString() })} />

      <FloatingLabelInput
        label="Вес"
        icon={Scale}
        type="text"
        inputMode="decimal"
        value={value.weight_kg}
        onChange={(e) => handleFormatChange("weight_kg", e.target.value)}
        className="h-9 text-xs"
      />

      <FloatingLabelInput
        label="Ставка"
        icon={DollarSign}
        type="text"
        inputMode="decimal"
        value={value.rate_per_kg}
        onChange={(e) => handleFormatChange("rate_per_kg", e.target.value)}
        className="h-9 text-xs"
      />

      <FloatingLabelInput
        label="Д. расход"
        icon={PlusCircle}
        type="text"
        inputMode="decimal"
        value={value.extra_fee}
        onChange={(e) => handleFormatChange("extra_fee", e.target.value)}
        className="h-9 text-xs"
      />

      <FloatingLabelInput
        label="Взнос"
        icon={Wallet}
        type="text"
        inputMode="decimal"
        value={value.deposit}
        onChange={(e) => handleFormatChange("deposit", e.target.value)}
        className="h-9 text-xs"
      />

      <FloatingLabelInput
        label="Остаток"
        icon={Calculator}
        readOnly
        value={balance.toFixed(2)}
        className="bg-muted/20 h-9 cursor-default text-xs"
      />
    </div>
  );
}
