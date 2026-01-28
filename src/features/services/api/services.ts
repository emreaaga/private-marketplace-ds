import { api } from "@/shared/lib/api";
import { CreateServicePayload } from "@/shared/types/services/services.dto";
import { Service } from "@/shared/types/services/services.model";
import { GetServicesParams } from "@/shared/types/services/services.query";

export const servicesService = {
  async getServices(params?: GetServicesParams): Promise<Service[]> {
    const { data } = await api.get("/services", {
      params,
    });

    return data;
  },

  async createService(payload: CreateServicePayload): Promise<Service> {
    const { data } = await api.post("/services", payload);
    return data;
  },
};
