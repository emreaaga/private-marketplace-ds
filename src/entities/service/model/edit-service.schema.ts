import { z } from "zod";

import { type ServicePrice } from "@/entities/service/model/services.pricing";
import { type ServiceType } from "@/entities/service/model/services.types";

export const serviceEditSchema = z.object({
  type: z.string().min(1, "Выберите тип услуги"),
  pricing_type: z.string().optional(),
  price: z
    .string()
    .min(1, "Введите цену")
    .refine((val) => !isNaN(Number(val)), "Цена должна быть числом")
    .refine((val) => Number(val) >= 0, "Цена должна быть больше или равна 0"),
  is_active: z.boolean(),
});

export type ServiceEditFormValues = Omit<z.infer<typeof serviceEditSchema>, "type" | "pricing_type"> & {
  type: ServiceType;
  pricing_type: ServicePrice;
};

export const SERVICE_EDIT_EMPTY: ServiceEditFormValues = {
  type: "" as ServiceType,
  pricing_type: "" as ServicePrice,
  price: "",
  is_active: true,
};
