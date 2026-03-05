import { z } from "zod";

export const companyTypeEnum = z.enum(["postal", "air_partner", "customs_broker"]);
export const countryCodeEnum = z.enum(["tr", "uz", "ch"]);

export const createCompanySchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  type: companyTypeEnum,
  location: z.object({
    country: countryCodeEnum,
    city: z.string().min(1, "Город обязателен"),
  }),
});

export type CreateCompanyFormData = z.infer<typeof createCompanySchema>;
export type CompanyType = z.infer<typeof companyTypeEnum>;
export type CountryCode = z.infer<typeof countryCodeEnum>;
