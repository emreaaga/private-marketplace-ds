import { z } from "zod";

export const tripSchema = z.object({
  flight_id: z.number({ required_error: "Выберите рейс" }).nullable(),
  stops: z
    .array(
      z.object({
        code: z.string().min(1, "Выберите город"),
      }),
    )
    .min(1, "Маршрут должен содержать хотя бы одну остановку"),
});

export type TripFormValues = z.infer<typeof tripSchema>;
