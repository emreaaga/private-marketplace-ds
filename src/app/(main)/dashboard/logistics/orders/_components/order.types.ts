export type Order = {
  id: string;
  customer: string;
  total: string;
  status: "pending" | "confirmed" | "canceled";
  status2: "client_1" | "courier_1" | "post_a_1" | "in_transit" | "tas" | "post_a_2" | "courier_2" | "client_2";
  date: string;
  items: Array<{
    name: string;
    sku: string;
    qty: number;
    price: number;
  }>;
};
