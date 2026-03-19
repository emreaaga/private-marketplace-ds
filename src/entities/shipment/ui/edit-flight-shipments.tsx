"use client";

import { useCallback, useMemo, useState } from "react";

import Big from "big.js";
import { PackageSearch, Plus } from "lucide-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import type { EditFlightFormValues } from "@/entities/flight/lib";
import { Button } from "@/shared/ui/atoms/button";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

import { AddingShipmentRow } from "./adding-shipment-row";
import { SelectedShipmentRow } from "./selected-shipment-row";

export function EditFlightShipments() {
  const { control, setValue, getValues } = useFormContext<EditFlightFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shipments_data",
    keyName: "rhf_id",
  });

  const selectedIds = useWatch({ control, name: "shipments", defaultValue: [] });
  const shipmentsData = useWatch({ control, name: "shipments_data", defaultValue: [] });

  const [addingRows, setAddingRows] = useState<string[]>([]);

  const addNewRow = useCallback(() => {
    const generateId = () => {
      if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
      }
      return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    };
    setAddingRows((prev) => [...prev, generateId()]);
  }, []);

  const removeAddingRow = useCallback(
    (rowId: string) => setAddingRows((prev) => prev.filter((id) => id !== rowId)),
    [],
  );

  const addShipment = useCallback(
    (id: number, meta: { name: string; weight: unknown; prepaid?: unknown; remaining?: unknown }, rowId: string) => {
      const currentIds = getValues("shipments");

      if (!currentIds.includes(id)) {
        setValue("shipments", [...currentIds, id], { shouldDirty: true });

        append({
          id,
          company_name: meta.name,
          total_weight_kg: String(meta.weight ?? 0),
          original_weight_kg: String(meta.weight ?? 0),
          total_prepaid: String(meta.prepaid ?? 0),
          total_remaining: String(meta.remaining ?? 0),
        });
      }
      removeAddingRow(rowId);
    },
    [getValues, setValue, append, removeAddingRow],
  );

  const removeShipment = useCallback(
    (dbId: number, index: number) => {
      const currentIds = getValues("shipments");

      setValue(
        "shipments",
        currentIds.filter((x: number) => x !== dbId),
        { shouldDirty: true },
      );

      remove(index);
    },
    [getValues, setValue, remove],
  );

  const { totals, weightDiffs } = useMemo(() => {
    const acc = {
      weight: new Big(0),
      prepaid: new Big(0),
      remaining: new Big(0),
    };

    const diffs: Record<number, number> = {};

    shipmentsData.forEach((curr) => {
      const currentVal = curr.total_weight_kg || "0";
      const originalVal = curr.original_weight_kg ?? currentVal;

      const currentW = new Big(currentVal);
      const originalW = new Big(originalVal);

      const diff = currentW.minus(originalW).toNumber();
      diffs[curr.id] = diff > 0.01 ? diff : 0;

      acc.weight = acc.weight.plus(currentW);
      acc.prepaid = acc.prepaid.plus(new Big(String(curr.total_prepaid ?? 0) || "0"));
      acc.remaining = acc.remaining.plus(new Big(String(curr.total_remaining ?? 0) || "0"));
    });

    return { totals: acc, weightDiffs: diffs };
  }, [shipmentsData]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/60 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Header */}
      <div className="border-b border-zinc-200/60 bg-zinc-50/50 px-4 py-1">
        <div className="grid grid-cols-[32px_60px_1fr_80px_90px_90px_32px] items-center gap-3">
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-md transition-colors hover:bg-zinc-200/50 hover:text-zinc-900"
              onClick={addNewRow}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">ID</span>
          <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Фирма</span>
          <span className="text-right text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Вес (кг)</span>
          <span className="text-right text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
            Предоплата
          </span>
          <span className="text-right text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">Остаток</span>
          <span />
        </div>
      </div>

      {/* Body */}
      <div className="relative min-h-0 flex-1 bg-white">
        <ScrollArea className="h-full">
          <div className="flex flex-col divide-y divide-zinc-100">
            {fields.map((field, index) => (
              <div key={field.rhf_id} className="group transition-colors hover:bg-zinc-50/50">
                <SelectedShipmentRow
                  index={index}
                  id={field.id}
                  meta={{
                    name: field.company_name,
                    weight: field.total_weight_kg,
                    weightDiff: weightDiffs[field.id] ?? 0,
                    prepaid: field.total_prepaid,
                    remaining: field.total_remaining,
                  }}
                  onRemoveAction={() => removeShipment(field.id, index)}
                />
              </div>
            ))}

            {addingRows.map((rowId) => (
              <AddingShipmentRow
                key={rowId}
                onCancelAction={() => removeAddingRow(rowId)}
                onSelectAction={(shipmentId, meta) => addShipment(shipmentId, meta, rowId)}
                excludeIds={selectedIds}
              />
            ))}

            {fields.length === 0 && addingRows.length === 0 && (
              <div
                className="group flex cursor-pointer flex-col items-center justify-center px-4 py-16"
                onClick={addNewRow}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-zinc-300 bg-zinc-50 transition-colors group-hover:border-zinc-400 group-hover:bg-zinc-100">
                  <PackageSearch className="h-5 w-5 text-zinc-400" />
                </div>
                <p className="text-[13px] font-medium text-zinc-500">Список пуст</p>
                <p className="text-[11px] text-zinc-400">Нажмите «+» или сюда, чтобы добавить отправку</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-zinc-200/60 bg-zinc-50/80 px-4">
        <div className="grid grid-cols-[32px_60px_1fr_80px_90px_90px_32px] items-center gap-3">
          <span />
          <span />
          <div className="text-right">
            <span className="text-[10px] font-bold tracking-tight text-zinc-400 uppercase">
              Итого ({fields.length}):
            </span>
          </div>
          <div className="text-right">
            <span className="text-[13px] font-bold text-zinc-900 tabular-nums">{totals.weight.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <span className="text-[13px] font-bold text-emerald-600 tabular-nums">${totals.prepaid.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <span className="text-[13px] font-bold text-orange-600 tabular-nums">${totals.remaining.toFixed(2)}</span>
          </div>
          <span />
        </div>
      </div>
    </div>
  );
}
