export type FlightResponse = {
  id: number;
  arrival_at: string;
};

export type GetFlightsLookupParams = {
  limit?: number;
};
