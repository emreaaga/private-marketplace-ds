"use client";

import { useEffect, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { useFlightDetails } from "@/features/flights/queries/use-flight-details";
import { useUpdateFlight } from "@/features/flights/queries/use-flight-update";
import { FLIGHT_STATUS_META } from "@/shared/types/flight/flight.status.meta";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

import { EditFlightShipments } from "./edit-flight-shipments";
import { toFormValues, toUpdatePayload, type EditFlightFormValues } from "./edit-flight.utils";
import { FlightGeneralForm } from "./flight-general-form";

interface EditFlightDialogProps {
  open: boolean;
  flightId: number | null;
  onOpenChangeAction: (open: boolean) => void;
}

const DEFAULT_VALUES: EditFlightFormValues = {
  departure_location: { country: null, city: null },
  arrival_location: { country: null, city: null },
  air_kg_price: "",
  awb_number: "",
  final_gross_weight_kg: "",
  shipments: [],
  shipments_data: [],
};

export function EditFlightDialog({ open, flightId, onOpenChangeAction }: EditFlightDialogProps) {
  const { data: flight, isLoading } = useFlightDetails(flightId, open);
  const updateMutation = useUpdateFlight();
  const [sessionKey, setSessionKey] = useState(0);

  const form = useForm<EditFlightFormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (flight) form.reset(toFormValues(flight));
  }, [flight, form]);

  const handleClose = () => {
    form.reset(DEFAULT_VALUES);
    setSessionKey((k) => k + 1);
    onOpenChangeAction(false);
  };

  const onSave = form.handleSubmit(async (values) => {
    if (!flightId) return;
    try {
      const payload = toUpdatePayload(values);
      await updateMutation.mutateAsync({ id: flightId, payload });
      handleClose();
    } catch {
      // Здесь ошибка
    }
  });

  const canSave = form.formState.isDirty && !updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="flex h-140! w-375! max-w-[calc(100vw-2rem)]! flex-col overflow-hidden p-0">
        <DialogHeader className="flex flex-row items-center gap-3 space-y-0 border-b px-4 py-3">
          <DialogTitle className="leading-none">{flightId ? `Рейс #${flightId}` : "Загрузка..."}</DialogTitle>

          {flight && (
            <Badge variant="secondary" className="gap-1">
              {(() => {
                const meta = FLIGHT_STATUS_META[flight.status];
                const Icon = meta.Icon;
                return (
                  <>
                    <Icon className="h-4 w-4 opacity-70" />
                    {meta.label}
                  </>
                );
              })()}
            </Badge>
          )}
        </DialogHeader>

        <FormProvider {...form}>
          <div className="min-h-0 flex-1">
            {isLoading ? (
              <div className="text-muted-foreground flex h-full items-center justify-center">
                Загрузка данных рейса...
              </div>
            ) : flight ? (
              <div className="grid h-full grid-cols-[450px_1fr]">
                <div className="min-w-0 overflow-auto px-4 py-4">
                  <FlightGeneralForm mode="edit" />
                </div>

                <div className="bg-muted/20 min-w-0 overflow-hidden px-2">
                  <EditFlightShipments key={`${flightId}-${sessionKey}`} />
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground p-10 text-center">Рейс не найден</div>
            )}
          </div>

          <div className="flex shrink-0 justify-end gap-2 border-t px-6 py-3">
            <Button size="sm" variant="secondary" onClick={handleClose}>
              Отмена
            </Button>
            <Button size="sm" onClick={onSave} disabled={!canSave}>
              {updateMutation.isPending ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
