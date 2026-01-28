import { z } from "zod";

export const companyTypeEnum = z.enum(["platform", "postal", "air_partner", "customs_broker"]);
export const countryCode = z.enum(["tr", "uz", "ch"]);

export const createCompanySchema = z.object({
  name: z.string().min(1),
  type: companyTypeEnum,
  country: countryCode,
  city: z.string().min(1),
});

export type CreateCompanyFormData = z.infer<typeof createCompanySchema>;
export type CompanyType = z.infer<typeof companyTypeEnum>;
