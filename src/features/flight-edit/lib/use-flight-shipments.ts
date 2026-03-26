import { useCallback, useMemo, useState } from "react";

import Big from "big.js";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import type { EditFlightFormValues } from "@/entities/flight/lib";

export function useFlightShipments() {
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
    (
      id: number,
      meta: {
        name: string;
        internalNumber: number;
        ordersCount: string;
        weight: unknown;
        prepaid?: unknown;
        remaining?: unknown;
      },
      rowId: string,
    ) => {
      const currentIds = getValues("shipments");

      if (!currentIds.includes(id)) {
        setValue("shipments", [...currentIds, id], { shouldDirty: true });

        append({
          id,
          internal_number: meta.internalNumber,
          orders_count: meta.ordersCount,
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
      orders: 0,
    };

    const diffs: Record<number, number> = {};

    shipmentsData.forEach((curr) => {
      const currentVal = curr.total_weight_kg || "0";
      const originalVal = curr.original_weight_kg ?? currentVal;

      const currentW = new Big(currentVal);
      const originalW = new Big(originalVal);

      const diff = currentW.minus(originalW).toNumber();
      diffs[curr.id] = diff > 0.01 ? diff : 0;

      acc.orders += Number(curr.orders_count || 0);

      acc.weight = acc.weight.plus(currentW);
      acc.prepaid = acc.prepaid.plus(new Big(String(curr.total_prepaid ?? 0) || "0"));
      acc.remaining = acc.remaining.plus(new Big(String(curr.total_remaining ?? 0) || "0"));
    });

    return { totals: acc, weightDiffs: diffs };
  }, [shipmentsData]);

  return {
    fields,
    addingRows,
    selectedIds,
    totals,
    weightDiffs,
    addNewRow,
    removeAddingRow,
    addShipment,
    removeShipment,
  };
}

export type UseFlightShipmentsReturn = ReturnType<typeof useFlightShipments>;
