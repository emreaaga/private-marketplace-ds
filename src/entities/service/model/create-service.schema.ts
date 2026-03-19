import { z } from "zod";

export const createServiceSchema = z.object({
  company_id: z.number().int().positive("Выберите фирму"),
  type: z.enum(["flight", "customs", "delivery", "marketing", "penalty"], {
    errorMap: () => ({ message: "Выберите тип услуги" }),
  }),
  pricing_type: z.enum(["per_kg", "fixed", "per_item"], {
    errorMap: () => ({ message: "Выберите тариф" }),
  }),

  price: z
    .string()
    .min(1, "Введите цену")
    .refine((val) => !isNaN(Number(val)), "Цена должна быть корректным числом")
    .refine((val) => Number(val) >= 0, "Цена должна быть больше или равна 0")
    .refine((val) => Number(val) <= 1_000_000, "Слишком большая цена"),
});

export type CreateServiceFormData = z.infer<typeof createServiceSchema>;
