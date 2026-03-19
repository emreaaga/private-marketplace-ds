import { z } from "zod";

import { CITY_CODES, COUNTRY_CODES } from "@/entities/geography";

import { COMPANY_TYPES } from "./company.types";

export const companyTypeEnum = z.enum(COMPANY_TYPES, {
  errorMap: () => ({ message: "Выберите тип фирмы" }),
});

export const countryCodeEnum = z.enum(COUNTRY_CODES, {
  errorMap: () => ({ message: "Выберите страну" }),
});

export const cityCodeEnum = z.enum(CITY_CODES, {
  errorMap: () => ({ message: "Выберите город" }),
});

export const createCompanySchema = z.object({
  name: z.string().trim().min(1, "Название обязательно"),
  type: companyTypeEnum,
  location: z.object({
    country: countryCodeEnum,
    city: cityCodeEnum,
  }),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
