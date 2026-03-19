import { z } from "zod";

import { cityCodeEnum, companyTypeEnum, countryCodeEnum } from "./create-company.schema";

export const editCompanySchema = z.object({
  name: z.string().trim().min(1, "Название обязательно"),
  type: companyTypeEnum,
  location: z.object({
    country: countryCodeEnum,
    city: cityCodeEnum,
  }),
  is_active: z.boolean(),
});

export type EditCompanySchema = z.infer<typeof editCompanySchema>;
