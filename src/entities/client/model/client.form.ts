import type { ClientBase } from "./client.base";

export type ClientForm = ClientBase & {
  code: string;

  passport_number: string;
  national_id: string;

  client_id?: number;
};
