"use client";

import dynamic from "next/dynamic";

import { Calculator, DollarSign, PlusCircle, Scale, Wallet } from "lucide-react";

import { OrderSummaryForm } from "@/shared/types/order/order-summary.form";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";

const ShipmentSelect = dynamic(() => import("./shipment-select").then((m) => m.ShipmentSelect), {
  ssr: false,
  loading: () => <div className="bg-muted/50 h-9 w-full animate-pulse rounded-md" />,
});

interface PartiesSummaryProps {
  value: OrderSummaryForm;
  onChange: (patch: Partial<OrderSummaryForm>) => void;
  shipmentId?: number;
}

export function PartiesSummary({ value, onChange, shipmentId }: PartiesSummaryProps) {
  const total = Number(value.weight_kg || 0) * Number(value.rate_per_kg || 0) + Number(value.extra_fee || 0);
  const balance = total - Number(value.deposit || 0);

  const handleFormatChange = (key: keyof OrderSummaryForm, val: string) => {
    const sanitized = val.replace(",", ".").replace(/[^\d.]/g, "");
    onChange({ [key]: sanitized });
  };

  return (
    <div className="grid grid-cols-6 items-end gap-2 py-2">
      {shipmentId ? (
        <div className="border-border/40 bg-muted/20 flex h-9 items-center gap-2 rounded-md border px-3 shadow-sm">
          <span className="text-muted-foreground/50 text-[10px] font-bold tracking-tight uppercase">OTP</span>
          <span className="font-mono text-[13px] leading-none font-bold">{shipmentId}</span>
        </div>
      ) : (
        <ShipmentSelect value={value.shipment_id} onChange={(id) => onChange({ shipment_id: id.toString() })} />
      )}

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
