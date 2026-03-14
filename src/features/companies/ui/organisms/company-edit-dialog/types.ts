import type { UpdateCompanyPayload } from "@/features/companies/api/companies";
import type { CountryCode } from "@/shared/types/geography/country.types";

export type LocationValue = {
  country: CountryCode | null;
  city: string | null;
  district?: null;
};

export type CompanyFormValues = Omit<UpdateCompanyPayload, "location"> & {
  location: LocationValue;
};
