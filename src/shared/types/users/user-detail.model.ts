import { User } from "./user.model";

export type UserDetail = User & {
  surname: string;
  country: string;
  city: string;
  district: string;
  address_line: string | null;
  phone_country_code: string;
  phone_number: string;
};
