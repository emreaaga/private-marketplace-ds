import type { CountryCode } from "@/shared/types/geography/country.types";
import type { UserRoles } from "@/shared/types/users/user.model";

export type CountryCityValue = {
  country: CountryCode | null;
  city: string | null;
  district?: string | null;
};

export type EditUserFormValues = {
  role: UserRoles;

  name: string;
  surname: string;
  email: string;

  location: CountryCityValue;

  address_line: string;
  phone_number: string;
};
