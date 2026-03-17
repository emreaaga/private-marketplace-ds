import { z } from "zod";

const companyTypeEnum = z.enum(["postal", "air_partner", "customs_broker"]);
const countryCodeEnum = z.enum(["tr", "uz", "ch"]);

export const createCompanySchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  type: companyTypeEnum,
  location: z.object({
    country: countryCodeEnum,
    city: z.string().min(1, "Город обязателен"),
  }),
});
