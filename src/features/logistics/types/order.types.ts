export type OrderStatus = "created" | "in_transit" | "delivered" | "canceled";

export type PaymentType = "prepaid" | "cod";

export type Order = {
  id: string;

  recipient: {
    name: string;
    city: string;
  };

  sender: {
    city: string;
  };

  weight: number; // кг

  payment: {
    type: PaymentType;
    amount: number;
  };

  status: OrderStatus;
  date: string;
};
