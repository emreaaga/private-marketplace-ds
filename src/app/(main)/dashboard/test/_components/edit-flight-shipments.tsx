"use client";

import { useState } from "react";

import { Plus, PackageSearch } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import type { FlightShipment } from "@/shared/types/flight/flight.dto";
import { Button } from "@/shared/ui/atoms/button";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

import { AddingShipmentRow } from "./adding-shipment-row";
import type { EditFlightFormValues } from "./edit-flight.utils";
import { SelectedShipmentRow } from "./selected-shipment-row";

export function EditFlightShipments({ initialShipments }: { initialShipments: FlightShipment[] }) {
  const { control, setValue, getValues } = useFormContext<EditFlightFormValues>();

  const selectedIds = useWatch({ control, name: "shipments" });

  const [addingRows, setAddingRows] = useState<string[]>([]);

  const [metadataCache, setMetadataCache] = useState<
    Map<number, { name: string; weight: unknown; prepaid?: unknown; remaining?: unknown }>
  >(
    () =>
      new Map(
        initialShipments.map((s) => [
          s.id,
          {
            name: s.company_name,
            weight: s.total_weight_kg,
            prepaid: s.total_prepaid,
            remaining: s.total_remaining,
          },
        ]),
      ),
  );

  const addNewRow = () => setAddingRows((prev) => [...prev, crypto.randomUUID()]);

  const removeAddingRow = (rowId: string) => setAddingRows((prev) => prev.filter((id) => id !== rowId));

  const addShipment = (
    id: number,
    meta: { name: string; weight: unknown; prepaid?: unknown; remaining?: unknown },
    rowId: string,
  ) => {
    const current = getValues("shipments");
    if (!current.includes(id)) {
      setMetadataCache((prev) => new Map(prev).set(id, meta));
      setValue("shipments", [...current, id], { shouldDirty: true });
    }
    removeAddingRow(rowId);
  };

  const removeShipment = (id: number) => {
    setValue(
      "shipments",
      selectedIds.filter((x: number) => x !== id),
      { shouldDirty: true },
    );
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            Состав рейса {selectedIds.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/10 hover:text-primary h-6 w-6 shrink-0"
          onClick={addNewRow}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-muted-foreground/60 grid grid-cols-[45px_1fr_75px_85px_85px_32px] gap-2 px-3 text-[9px] font-bold tracking-tight uppercase">
        <span>ID</span>
        <span>Фирма</span>
        <span className="text-right">Вес</span>
        <span className="text-right">Предоплата</span>
        <span className="text-right">Остаток</span>
      </div>

      <div className="min-h-0 flex-1">
        <ScrollArea className="bg-background h-full rounded-md border text-sm shadow-sm">
          <div className="divide-border/40 divide-y">
            {selectedIds.map((id: number) => (
              <SelectedShipmentRow
                key={id}
                id={id}
                meta={metadataCache.get(id)}
                onRemoveAction={() => removeShipment(id)}
              />
            ))}

            {addingRows.map((rowId) => (
              <AddingShipmentRow
                key={rowId}
                onCancelAction={() => removeAddingRow(rowId)}
                onSelectAction={(shipmentId, meta) => addShipment(shipmentId, meta, rowId)}
                excludeIds={selectedIds}
              />
            ))}

            {selectedIds.length === 0 && addingRows.length === 0 && (
              <div
                className="text-muted-foreground hover:bg-muted/10 flex h-24 cursor-pointer flex-col items-center justify-center gap-1 transition-colors"
                onClick={addNewRow}
              >
                <PackageSearch className="h-6 w-6 opacity-20" />
                <span className="text-[11px] italic">Нажмите +, чтобы добавить отправку</span>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
