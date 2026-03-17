import type { ClientBase } from "./client.base";

export type ClientForm = ClientBase & {
  code: string;
  passports: string[];

  client_id?: number;
};
