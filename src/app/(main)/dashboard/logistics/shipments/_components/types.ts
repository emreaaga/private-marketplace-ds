export type Shipment = {
  id: string;
  code: string;
  route: string;
  ordersCount: number;
  weightKg: number;
  total: number;
  status: string;
  locked: boolean;
};
