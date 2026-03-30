"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

import { tripSchema, type TripFormValues } from "./trip-create.schema";

export function useTripCreateForm(open: boolean, availableCitiesCount: number = 0) {
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    mode: "onChange",
    defaultValues: {
      flight_id: null,
      stops: [{ code: "TAS" }],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "stops",
  });

  const selectedFlightId = useWatch({
    control: form.control,
    name: "flight_id",
  });

  const currentStops =
    useWatch({
      control: form.control,
      name: "stops",
    }) || [];

  useEffect(() => {
    if (!open) {
      form.reset({ flight_id: null, stops: [{ code: "TAS" }] });
    }
  }, [open, form]);

  const isAllCitiesAdded = availableCitiesCount > 0 ? currentStops.length === availableCitiesCount : false;

  const isFormReady = form.formState.isValid && isAllCitiesAdded;

  const handleFlightChange = (id: number | null) => {
    form.setValue("flight_id", id, { shouldValidate: true });
    form.setValue("stops", [{ code: "TAS" }]);
  };

  const handleAddStop = () => append({ code: "" });

  const handleRemoveStop = (id: string) => {
    const index = fields.findIndex((f) => f.id === id);
    if (index !== -1) remove(index);
  };

  const handleUpdateStop = (id: string, code: string) => {
    const index = fields.findIndex((f) => f.id === id);
    if (index !== -1) update(index, { code });
  };

  return {
    form,
    fields,
    selectedFlightId,
    currentStops,
    isFormReady,
    handlers: {
      handleFlightChange,
      handleAddStop,
      handleRemoveStop,
      handleUpdateStop,
    },
  };
}
