import { Service } from "./services.model";

export type CreateServicePayload = {
  company_id: number;
  type: Service["type"];
  pricing_type: Service["pricing_type"];
  price: number;
};
