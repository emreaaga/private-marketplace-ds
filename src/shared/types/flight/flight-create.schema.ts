import { z } from "zod";

import type { CountryCode } from "@/shared/types/geography/country.types";

const countryCodeSchema = z.string().min(2) as z.ZodType<CountryCode>;

const countryCitySchema = z.object({
  country: z.preprocess((v) => v ?? "", countryCodeSchema),
  city: z.preprocess((v) => v ?? "", z.string().trim().min(1)),
});

export const flightFormSchema = z.object({
  departure_location: countryCitySchema,
  arrival_location: countryCitySchema,

  air_partner_id: z.coerce.number().int().positive(),
  sender_customs_id: z.coerce.number().int().positive(),
  receiver_customs_id: z.coerce.number().int().positive(),

  air_service_id: z.coerce.number().int().positive().optional(),
  air_kg_price: z.preprocess((v) => v ?? "", z.string().trim().min(1)),

  loading_at: z.coerce.date(),
  departure_at: z.coerce.date(),
  arrival_at: z.coerce.date(),
  unloading_at: z.coerce.date(),

  shipments: z.array(z.coerce.number().int().positive()).min(1),
});

export type FlightFormValues = z.infer<typeof flightFormSchema>;
