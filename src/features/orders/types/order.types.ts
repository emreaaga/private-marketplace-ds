export type Order = {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "confirmed" | "canceled";
  date: string;
  items: Array<{
    name: string;
    sku: string;
    qty: number;
    price: number;
  }>;
};
