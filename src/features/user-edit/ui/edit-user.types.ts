import type { CountryCode } from "@/entities/geography";
import type { UserRoles } from "@/entities/user";

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

  password?: string;

  location: CountryCityValue;

  address_line: string;
  phone_code?: string;
  phone_number: string;
};
