"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { useCreateFlight } from "@/features/flights/queries/use-create-flight";
import { flightFormSchema, type FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

import { toCreateFlightDto } from "../../logistics/flights/_components/to-create-flight-dto";

import { FlightGeneralForm } from "./flight-general-form";
import { ShipmentList } from "./shipment-list";

export function FlightsDialog({
  open,
  onOpenChangeAction,
}: {
  open: boolean;
  onOpenChangeAction: (o: boolean) => void;
}) {
  const createMutation = useCreateFlight();

  const form = useForm<FlightFormValues>({
    resolver: zodResolver(flightFormSchema),
    mode: "onSubmit",
    defaultValues: {
      departure_location: { country: "tr", city: "ist" },
      arrival_location: { country: "uz", city: "tas" },
      shipments: [],
    },
  });

  const onSave = form.handleSubmit(async (values) => {
    await createMutation.mutateAsync(toCreateFlightDto(values));
    handleClose();
  });

  const handleClose = () => {
    form.reset();
    onOpenChangeAction(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent
        className={[
          "w-[1500px]! max-w-[calc(100vw-2rem)]!",
          "h-[600px]! max-h-[calc(100vh-2rem)]!",
          "flex flex-col overflow-hidden p-0",
        ].join(" ")}
      >
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Создание рейса</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <div className="min-h-0 flex-1">
            <div className="grid h-full min-h-0 grid-cols-[450px_1fr]">
              <div className="min-w-0 overflow-auto px-4 py-4">
                <FlightGeneralForm mode="create" />
              </div>

              <div className="bg-muted/20 min-w-0 overflow-hidden px-2 py-2">
                <ShipmentList />
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t px-6 py-3">
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Отмена
              </Button>
              <Button onClick={onSave} disabled={createMutation.isPending}>
                {createMutation.isPending ? "Сохранение..." : "Создать рейс"}
              </Button>
            </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
