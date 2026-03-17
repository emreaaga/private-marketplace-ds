export type OrderSummaryForm = {
  shipment_id: string | null;
  weight_kg: string;
  rate_per_kg: string;
  extra_fee: string;
  deposit: string;
};
