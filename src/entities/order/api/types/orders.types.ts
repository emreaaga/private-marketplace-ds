import { CityCode, CountryCode } from "@/entities/geography";

import { type OrderStatus } from "../../model/order.status";

export type OrderPassport = {
  passport_number: string;
};

export type OrderContact = {
  name: string;
  surname: string;
  country: CountryCode | string | null;
  city: CityCode | string | null;
  district: string | null;
  phone_country_code: string;
  phone_number: string;
  address_line: string;
  passports: OrderPassport[];
};

export type OrderItem = {
  name: string;
  quantity: number;
  unit_price: string;
};

export type OrderListItem = {
  id: number;
  company_name: string;
  sender_name: string;
  receiver_name: string;
  weight_kg: string;
  rate_per_kg: string;
  extra_fee: string;
  total_amount: string;
  prepaid_amount: string;
  balance: string;
  status: OrderStatus;
  created_at: string;
};
