import { api } from "@/shared/lib/api";
import { CreateFlightDto, FlightDetails, ApiResponse } from "@/shared/types/flight/flight.dto";
import { Flight } from "@/shared/types/flight/flight.model";

type FlightsResponse = {
  data: Flight[];
};

export const flightsService = {
  async createFlight(payload: CreateFlightDto) {
    const { data } = await api.post("/flights", payload);
    return data;
  },

  async getFlights(): Promise<Flight[]> {
    const { data } = await api.get<FlightsResponse>("/flights");
    return data.data;
  },

  async getFlight(id: number): Promise<FlightDetails> {
    const { data } = await api.get<ApiResponse<FlightDetails>>(`/flights/${id}`);
    return data.data;
  },
};
