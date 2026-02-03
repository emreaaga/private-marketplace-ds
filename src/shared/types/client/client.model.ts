import type { ClientBase } from "./client.base";
import type { ClientStatus } from "./client.status";
import type { Passport } from "./passport/passport.model";

export type Client = ClientBase & {
  id: number;
  email: string;
  status: ClientStatus;

  passports: Passport[];
};
