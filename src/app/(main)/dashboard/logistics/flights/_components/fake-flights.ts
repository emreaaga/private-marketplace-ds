import { Flight } from "./flights.type";

export const FAKE_FLIGHTS: Flight[] = [
  {
    id: 777,
    route: "TR-UZ",
    air_partner_name: "Turkish Airlines",
    air_kg_price: "6.00$/кг",
    final_gross_weight_kg: "125.50кг",
    status: "В пути",
    arrival_at: "12.09.2025 · 14:32",
    prepaid_sum: "283.00$",
    remaining_sum: "128.03$",
    shipments_count: "28",
    sender_customs: "faravon",
    receiver_customs: "osyo",
    sender_customs_price: "2.20$/кг",
    receiver_customs_price: "1.50$/кг",
    delivered_count: "15", // 15 из 28 доставлено
  },
  {
    id: 888,
    route: "CN-UZ",
    air_partner_name: "China Southern",
    air_kg_price: "5.50$/кг",
    final_gross_weight_kg: "250.40кг",
    status: "Ожидается",
    arrival_at: "15.09.2025 · 10:00",
    prepaid_sum: "150.00$",
    remaining_sum: "450.00$",
    shipments_count: "12",
    sender_customs: "zamon",
    receiver_customs: "faravon",
    sender_customs_price: "3.00$/кг",
    receiver_customs_price: "1.20$/кг",
    delivered_count: "0",
  },
];
