export type OrderStatus = "created" | "in_transit" | "delivered" | "canceled";

export type PaymentType = "prepaid" | "cod";

export type ExtraCharge = {
  title: string;
  amount: number;
};

export type Order = {
  id: string;

  counter: number;

  sender: {
    name: string;
    phone: string;
    city: string;
  };

  recipient: {
    name: string;
    phone: string;
    city: string;
  };

  weight: number; // кг
  ratePerKg: number; // ставка за кг

  extraCharges?: ExtraCharge[];

  payment1: {
    type: PaymentType; // где оплачено
    amount: number;
    location: "turkey" | "destination";
  };

  payment2?: {
    type: PaymentType;
    amount: number;
    location: "turkey" | "destination";
  };

  status: OrderStatus;
  date: string;
};
