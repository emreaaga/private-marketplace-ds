import { UserRoles } from "@/shared/types/users/user.model";

export interface CreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;

  country: string;
  city: string;
  district: string;

  address_line: string;

  phone_country_code: string;
  phone_number: string;

  company_id?: number;
  role?: UserRoles;
}
