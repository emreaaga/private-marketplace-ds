import type { UpdateCompanyPayload } from "@/entities/company";
import type { CountryCode } from "@/entities/geography";

export type LocationValue = {
  country: CountryCode | null;
  city: string | null;
  district?: null;
};

export type CompanyFormValues = Omit<UpdateCompanyPayload, "location"> & {
  location: LocationValue;
};
