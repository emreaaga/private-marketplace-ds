import type { Passport } from "@/entities/passport";

import type { ClientBase } from "./client.base";
import type { ClientStatus } from "./client.status";

export type Client = ClientBase & {
  id: number;
  email: string;
  status: ClientStatus;

  passports: Passport[];
};
