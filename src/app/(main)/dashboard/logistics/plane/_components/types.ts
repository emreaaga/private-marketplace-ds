export type FlightStatus = "confirmed" | "planned" | "cancelled";

export interface Flight {
  id: string;

  fromCode: string;
  toCode: string;

  fromCountryCode: string;
  toCountryCode: string;

  date: string;
  departureTime: string;
  cutoffTime: string;

  status: FlightStatus;
}
