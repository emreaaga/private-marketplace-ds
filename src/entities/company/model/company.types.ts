import { z } from "zod";

export const COMPANY_TYPES = ["postal", "air_partner", "customs_broker", "airline"] as const;
export const ALL_COMPANY_TYPES = [...COMPANY_TYPES, "platform"] as const;

export type CompanyType = (typeof COMPANY_TYPES)[number];
export type AllCompanyType = (typeof ALL_COMPANY_TYPES)[number];

export const companyTypeSchema = z.enum(COMPANY_TYPES);
