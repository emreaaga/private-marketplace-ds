export interface FlightCityDistribution {
  branch_id: number;
  code: string;
  count: string;
  weight: string;
  cash: string;
}

export interface FlightDistributionSummary {
  total_orders: string;
  total_weight: string;
  total_cash: string;
}

export interface FlightDistributionRes {
  data: FlightCityDistribution[];
  summary: FlightDistributionSummary;
}
