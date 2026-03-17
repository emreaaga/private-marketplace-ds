import { z } from "zod";

export const editFlightSchema = z.object({
  departure_location: z.object({
    country: z.string().min(1, "Выберите страну"),
    city: z.string().min(1, "Укажите город"),
  }),
  arrival_location: z.object({
    country: z.string().min(1, "Выберите страну"),
    city: z.string().min(1, "Укажите город"),
  }),
  air_partner_id: z.number({ required_error: "Выберите партнера" }),
  sender_customs_id: z.number({ required_error: "Выберите отправителя" }),
  receiver_customs_id: z.number({ required_error: "Выберите получателя" }),
  air_kg_price: z.string().min(1, "Укажите цену"),
  loading_at: z.date({ required_error: "Дата обязательна" }),
  departure_at: z.date({ required_error: "Дата обязательна" }),
  arrival_at: z.date({ required_error: "Дата обязательна" }),
  unloading_at: z.date({ required_error: "Дата обязательна" }),
  awb_number: z.string().optional(),
  final_gross_weight_kg: z.string().optional(),
  shipments: z.array(z.number()).min(1, "Выберите хотя бы одну отправку"),
});

export type EditFlightFormValues = z.infer<typeof editFlightSchema>;

export const formatters = {
  toMoney: (v: unknown) => (Number.isFinite(Number(v)) ? Number(v).toFixed(2) : ""),
  toKg: (v: unknown) => (Number.isFinite(Number(v)) ? Number(v).toFixed(2) : ""),
  normalizeKg: (v: string) => {
    const n = Number(v.trim().replace(",", "."));
    return Number.isFinite(n) ? n.toFixed(2) : null;
  },
};
