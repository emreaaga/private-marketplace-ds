"use client";

import { useState } from "react";

import { Plus, PackageSearch } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import type { FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import { Button } from "@/shared/ui/atoms/button";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

import { AddingShipmentRow } from "./adding-shipment-row";
import { SelectedShipmentRow } from "./selected-shipment-row";

export function ShipmentList() {
  const { control, setValue, getValues } = useFormContext<FlightFormValues>();

  const selectedIds = useWatch({ control, name: "shipments" });

  const [addingRows, setAddingRows] = useState<string[]>([]);

  const [metadataCache, setMetadataCache] = useState<Map<number, { name: string; weight: unknown }>>(() => new Map());

  const addNewRow = () => {
    const generateId = () => {
      if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
      }
      return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    };

    setAddingRows((prev) => [...prev, generateId()]);
  };

  const removeAddingRowAction = (rowId: string) => setAddingRows((prev) => prev.filter((id) => id !== rowId));

  const addShipmentAction = (id: number, meta: { name: string; weight: unknown }, rowId: string) => {
    const current = getValues("shipments");
    if (!current.includes(id)) {
      setMetadataCache((prev) => new Map(prev).set(id, meta));
      setValue("shipments", [...current, id], { shouldDirty: true, shouldValidate: true });
    }
    removeAddingRowAction(rowId);
  };

  const removeShipmentAction = (id: number) => {
    setValue(
      "shipments",
      selectedIds.filter((x: number) => x !== id),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
          Состав рейса ({selectedIds.length})
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/10 hover:text-primary h-6 w-6"
          onClick={addNewRow}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="min-h-0 flex-1">
        <ScrollArea className="bg-background h-full rounded-md border shadow-sm">
          <div className="divide-border/40 divide-y">
            {selectedIds.map((id: number) => (
              <SelectedShipmentRow
                key={id}
                id={id}
                meta={metadataCache.get(id)}
                onRemoveAction={() => removeShipmentAction(id)}
              />
            ))}

            {addingRows.map((rowId) => (
              <AddingShipmentRow
                key={rowId}
                onCancelAction={() => removeAddingRowAction(rowId)}
                onSelectAction={(shipmentId, meta) => addShipmentAction(shipmentId, meta, rowId)}
                excludeIds={selectedIds}
              />
            ))}

            {selectedIds.length === 0 && addingRows.length === 0 && (
              <div
                className="text-muted-foreground hover:bg-muted/10 flex h-32 cursor-pointer flex-col items-center justify-center gap-1 transition-colors"
                onClick={addNewRow}
              >
                <PackageSearch className="h-6 w-6 opacity-20" />
                <span className="text-[11px] italic">Нажмите +, чтобы выбрать отправeу</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
