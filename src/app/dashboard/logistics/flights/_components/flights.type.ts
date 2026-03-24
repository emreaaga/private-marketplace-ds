export type Flight = {
  id: number;
  route: string;
  air_partner_name: string;
  air_kg_price: string;
  final_gross_weight_kg: string | null;
  status: string;
  arrival_at: string;
  shipments_count: string;
  prepaid_sum: string;
  remaining_sum: string;
  sender_customs: string;
  receiver_customs: string;
  // Добавляем недостающие поля для полной картины:
  sender_customs_price: string;
  receiver_customs_price: string;
  delivered_count: string; // Сколько заказов уже доехало до клиентов
};
