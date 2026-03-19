import { ServicePrice } from "@/entities/service/model/services.pricing";
import { ServiceType } from "@/entities/service/model/services.types";

export type ServiceEditFormValues = {
  type: ServiceType;
  pricing_type: ServicePrice;
  price: string;
  is_active: boolean;
};

export const SERVICE_EDIT_EMPTY: ServiceEditFormValues = {
  type: "" as ServiceType,
  pricing_type: "" as ServicePrice,
  price: "",
  is_active: true,
};
