"use client";

import { useCallback, useMemo, useState } from "react";

import Big from "big.js";
import { PackageSearch, Plus } from "lucide-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import type { FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import { Button } from "@/shared/ui/atoms/button";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

import { AddingShipmentRow } from "./adding-shipment-row";
import { SelectedShipmentRow } from "./selected-shipment-row";

export function ShipmentList() {
  const { control, setValue, getValues } = useFormContext<FlightFormValues>();

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

  const addShipmentAction = useCallback(
    (id: number, meta: { name: string; weight: unknown; prepaid?: unknown; remaining?: unknown }, rowId: string) => {
      const currentIds = getValues("shipments");

      if (!currentIds.includes(id)) {
        setValue("shipments", [...currentIds, id], { shouldDirty: true, shouldValidate: true });

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

  const removeShipmentAction = useCallback(
    (dbId: number, index: number) => {
      const currentIds = getValues("shipments");

      setValue(
        "shipments",
        currentIds.filter((x) => x !== dbId),
        { shouldDirty: true, shouldValidate: true },
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
      const originalVal = curr.original_weight_kg;

      const currentW = new Big(currentVal);
      const originalW = new Big(originalVal);

      const diff = currentW.minus(originalW).toNumber();
      diffs[curr.id] = diff > 0.01 ? diff : 0;

      acc.weight = acc.weight.plus(currentW);
      acc.prepaid = acc.prepaid.plus(new Big(String(curr.total_prepaid) || "0"));
      acc.remaining = acc.remaining.plus(new Big(String(curr.total_remaining) || "0"));
    });

    return { totals: acc, weightDiffs: diffs };
  }, [shipmentsData]);

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="text-muted-foreground grid grid-cols-[30px_60px_1fr_70px_80px_80px_32px] items-center gap-2 px-3 text-[9px] font-bold tracking-tight uppercase">
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 hover:text-primary h-5 w-5 shrink-0"
            onClick={addNewRow}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span>ID</span>
        <span>Фирма</span>
        <span className="text-right">Вес</span>
        <span className="text-right">Взнос</span>
        <span className="text-right">Остаток</span>
        <span />
      </div>

      <div className="flex min-h-0 flex-1 flex-col rounded-md border shadow-sm">
        <ScrollArea className="bg-background flex-1 text-sm">
          <div className="divide-border/40 divide-y">
            {fields.map((field, index) => (
              <SelectedShipmentRow
                key={field.rhf_id}
                index={index}
                id={field.id}
                meta={{
                  name: field.company_name,
                  weight: field.total_weight_kg,
                  weightDiff: weightDiffs[field.id] ?? 0,
                  prepaid: field.total_prepaid,
                  remaining: field.total_remaining,
                }}
                onRemoveAction={() => removeShipmentAction(field.id, index)}
              />
            ))}

            {addingRows.map((rowId) => (
              <AddingShipmentRow
                key={rowId}
                onCancelAction={() => removeAddingRow(rowId)}
                onSelectAction={(shipmentId, meta) => addShipmentAction(shipmentId, meta, rowId)}
                excludeIds={selectedIds}
              />
            ))}

            {fields.length === 0 && addingRows.length === 0 && (
              <div
                className="text-muted-foreground hover:bg-muted/10 flex h-24 cursor-pointer flex-col items-center justify-center gap-1 transition-colors"
                onClick={addNewRow}
              >
                <PackageSearch className="h-6 w-6 opacity-20" />
                <span className="text-[11px] italic">Нажмите +, чтобы выбрать отправку</span>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="bg-muted/30 border-t p-1 text-[11px] font-medium">
          <div className="grid grid-cols-[30px_60px_1fr_70px_80px_80px_32px] items-center gap-2">
            <span />
            <span />
            <span className="text-muted-foreground text-right font-bold tracking-wider uppercase">
              Итого ({fields.length}):
            </span>
            <span className="text-right font-semibold tabular-nums">{totals.weight.toFixed(2)} кг</span>
            <span className="text-right font-semibold text-green-600/80 tabular-nums">
              ${totals.prepaid.toFixed(2)}
            </span>
            <span className="text-right font-semibold text-orange-600/80 tabular-nums">
              ${totals.remaining.toFixed(2)}
            </span>
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
