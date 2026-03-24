import type { ClientForm } from "./client.form";

export const emptyClientForm = (): ClientForm => ({
  code: "",

  firstName: "",
  lastName: "",

  passport_number: "",
  national_id: "",

  country: null,
  city: null,
  district: null,

  phone_country_code: "",
  phone_number: "",

  address: "",
});
