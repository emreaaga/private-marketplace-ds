"use client";

import { useState } from "react";

import { NativeSelect, NativeSelectOption } from "@/shared/ui/atoms/native-select";

import { AVAILABLE_COMPANIES, CompanyShipment } from "./fake-shipment-list";

export function ShipmentList() {
  const [list, setList] = useState<CompanyShipment[]>([]);
  const [companyId, setCompanyId] = useState<string>("");

  function removeShipment(companyId: string) {
    setList((prev) => prev.filter((item) => item.companyId !== companyId));
  }

  const selectedCompany = AVAILABLE_COMPANIES.find((c) => c.companyId === companyId);

  function addShipment(shipmentId: string) {
    if (!selectedCompany) return;

    const shipment = selectedCompany.shipments.find((s) => s.id === shipmentId);
    if (!shipment) return;

    setList((prev) => [
      ...prev,
      {
        companyId: selectedCompany.companyId,
        companyName: selectedCompany.companyName,
        hasDebt: selectedCompany.hasDebt,
        debtAmount: selectedCompany.debtAmount,
        shipment,
      },
    ]);

    setCompanyId("");
  }

  return (
    <div className="max-w-xl divide-y rounded-md border text-xs">
      {list.map((item) => (
        <div key={item.companyId} className="flex items-center gap-3 px-3 py-2">
          <span className="w-40 truncate font-medium">{item.companyName}</span>

          <div className="text-muted-foreground flex gap-2 font-mono text-[11px]">
            <span>{item.shipment.code}</span>
            <span>{item.shipment.boxesCount} кор.</span>
            <span>{item.shipment.weightKg} кг</span>
          </div>

          <div className="ml-auto flex items-center gap-2 text-[11px] font-medium">
            <span className={item.hasDebt ? "text-red-600" : "text-muted-foreground"}>${item.debtAmount}</span>

            <button
              type="button"
              onClick={() => removeShipment(item.companyId)}
              className="text-muted-foreground hover:text-red-600"
              title="Удалить"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <div className="bg-muted/30 flex items-center gap-1 px-0.5 py-0.5">
        <NativeSelect
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="h-8 w-36 text-xs leading-tight"
        >
          <NativeSelectOption value="" disabled>
            Компания
          </NativeSelectOption>

          {AVAILABLE_COMPANIES.map((c) => (
            <NativeSelectOption
              key={c.companyId}
              value={c.companyId}
              disabled={list.some((i) => i.companyId === c.companyId)}
            >
              {c.companyName}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect
          disabled={!selectedCompany}
          value=""
          onChange={(e) => addShipment(e.target.value)}
          className="h-8 w-40 text-xs leading-tight"
        >
          <NativeSelectOption value="" disabled>
            Отправка
          </NativeSelectOption>

          {selectedCompany?.shipments.map((s) => (
            <NativeSelectOption key={s.id} value={s.id}>
              {s.code} · {s.boxesCount} · {s.weightKg} кг
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
    </div>
  );
}
