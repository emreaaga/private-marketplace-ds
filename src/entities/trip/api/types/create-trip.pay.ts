type TripStopsDto = {
  branch_id: number;
  stop_order: number;
};

export type CreateTripPay = {
  flight_id: number;
  stops: TripStopsDto[];
};
