"use client";

import { useFlightDistribution } from "@/entities/flight";
import { useCreateTrip } from "@/entities/trip";
import { Button } from "@/shared/ui/atoms/button";
import { DialogFooter } from "@/shared/ui/atoms/dialog";

import type { TripFormValues } from "../model/trip-create.schema";
import { useTripCreateForm } from "../model/use-trip-create-form";

import { TripDistributionSummary } from "./trip-distribution-summary";
import { TripRouteList } from "./trip-route-list";

interface TripCreateFormProps {
  open: boolean;
  onCancel: () => void;
  flightId: number;
}

export function TripCreateForm({ open, onCancel, flightId }: TripCreateFormProps) {
  // Передаем flightId прямо в хук (предполагаю, что второй аргумент это initialFlightId)
  const { form, fields, currentStops, isFormReady, handlers } = useTripCreateForm(open, flightId);

  const { mutate: createTrip, isPending } = useCreateTrip();

  // Запрашиваем дистрибуцию сразу по известному flightId
  const { data: distribution, isFetching } = useFlightDistribution(flightId);

  const isAllCitiesAdded = distribution?.data ? currentStops.length === distribution.data.length : false;
  const finalIsFormReady = isFormReady || (form.formState.isValid && isAllCitiesAdded);

  const onSubmit = (values: TripFormValues) => {
    if (!distribution?.data) return;

    const payload = {
      flight_id: flightId, // <-- Используем переданный пропс, а не данные из формы
      stops: values.stops.map((stop, index) => {
        const city = distribution.data.find((c) => c.code.toUpperCase() === stop.code.toUpperCase());
        return {
          branch_id: city?.branch_id as number,
          stop_order: index + 1,
        };
      }),
    };

    createTrip(payload, {
      onSuccess: () => {
        onCancel();
      },
    });
  };

  const stopsForList = fields.map((field, index) => ({
    id: field.id,
    code: currentStops[index]?.code || "",
  }));

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-1 flex-col overflow-hidden">
      {/* Секция TripFlightSection удалена, так как рейс уже выбран */}

      <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-6">
        <TripRouteList
          stops={stopsForList}
          availableCities={distribution?.data}
          onAddStop={handlers.handleAddStop}
          onRemoveStop={handlers.handleRemoveStop}
          onUpdateStop={handlers.handleUpdateStop}
        />
      </div>

      <div className="shrink-0 px-6 pt-2 pb-4">
        <TripDistributionSummary
          summary={distribution?.summary}
          isFetching={isFetching}
          isVisible={true} // <-- Всегда показываем, так как рейс уже есть
        />
      </div>

      <DialogFooter className="border-border/60 bg-secondary/20 shrink-0 gap-2 border-t px-6 py-4 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="text-[13px]"
          disabled={isPending}
        >
          Отмена
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="bg-black px-6 text-[13px] text-white transition-all hover:bg-black/90"
          disabled={!finalIsFormReady || isFetching || form.formState.isSubmitting || isPending}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              Создание...
            </span>
          ) : (
            "Создать рейс"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
