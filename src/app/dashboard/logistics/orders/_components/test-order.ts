export type OrderStatus = "in_transit" | "delivered" | "canceled" | "pending";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;

  sender: {
    name: string;
    city: string;
    phone: string; // Добавлено
  };
  recipient: {
    name: string;
    city: string;
    phone: string; // Добавлено
  };

  weight: number;
  rate: number;

  finances: {
    cargoPrice: number; // Чистая цена за перевозку (weight * rate)
    extraPayment: number; // Доп. оплата (например, за упаковку)
    extraExpense: number; // Доп. расход (наши затраты)
    deposit: number; // Сколько клиент уже внес
    total: number; // Итоговая сумма к оплате
  };
}
