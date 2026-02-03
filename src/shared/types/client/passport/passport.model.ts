import type { CountryCode } from "../../geography/country.types";

import type { PassportStatus } from "./passport.status";

export type Passport = {
  id: number;
  client_id: number;
  passport_number: string;
  country: CountryCode;
  issued_at: string;
  expires_at: string;
  status: PassportStatus;
  is_primary: boolean;
  created_at: string;
};
