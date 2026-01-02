export type Order = {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "confirmed" | "canceled";
  status2: "created" | "in_transit" | "at_hub" | "with_courier" | "delivered" | "canceled";
  date: string;
  items: Array<{
    name: string;
    sku: string;
    qty: number;
    price: number;
  }>;
};
