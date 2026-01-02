"use client";

import { Badge } from "@/shared/ui/atoms/badge";

import ShipmentHeader from "../_components/shipment-header";

type OrderStatus = "CREATED" | "IN_WAREHOUSE" | "DELIVERING" | "COMPLETED" | "CANCELLED";

type PaymentStatus = "PAID" | "PARTIAL" | "UNPAID";

interface Order {
  id: string;
  post: string;
  weightKg: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
}

const orders: Order[] = [
  {
    id: "Z100001A001",
    post: "Express Post",
    weightKg: 12.4,
    totalAmount: 80,
    paymentStatus: "PAID",
    status: "IN_WAREHOUSE",
  },
  {
    id: "Z100002A001",
    post: "Global Cargo",
    weightKg: 8.1,
    totalAmount: 52,
    paymentStatus: "PARTIAL",
    status: "DELIVERING",
  },
  {
    id: "Z100003A001",
    post: "Express Post",
    weightKg: 15.6,
    totalAmount: 101,
    paymentStatus: "UNPAID",
    status: "CREATED",
  },
];

export default function ShipmentOrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <ShipmentHeader />

      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Заказ</th>
              <th className="px-4 py-3 text-left font-medium">Почта</th>
              <th className="px-4 py-3 text-right font-medium">Вес</th>
              <th className="px-4 py-3 text-right font-medium">Сумма</th>
              <th className="px-4 py-3 text-center font-medium">Оплата</th>
              <th className="px-4 py-3 text-center font-medium">Статус</th>
              <th className="px-4 py-3 text-center font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t last:border-b">
                <td className="px-4 py-3 font-medium">{order.id}</td>

                <td className="px-4 py-3">{order.post}</td>

                <td className="px-4 py-3 text-right">{order.weightKg} кг</td>

                <td className="px-4 py-3 text-right">${order.totalAmount}</td>

                <td className="px-4 py-3 text-center">
                  <Badge variant={getPaymentBadgeVariant(order.paymentStatus)}>
                    {getPaymentLabel(order.paymentStatus)}
                  </Badge>
                </td>

                <td className="px-4 py-3 text-center">
                  <Badge variant={getOrderStatusBadgeVariant(order.status)}>{getOrderStatusLabel(order.status)}</Badge>
                </td>

                <td className="text-muted-foreground px-4 py-3 text-center">👁</td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-muted-foreground p-6 text-sm">В этой отправке пока нет заказов.</div>
        )}
      </div>
    </div>
  );
}

function getPaymentLabel(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return "Оплачено";
    case "PARTIAL":
      return "Частично";
    case "UNPAID":
      return "Не оплачено";
  }
}

function getOrderStatusLabel(status: OrderStatus) {
  switch (status) {
    case "CREATED":
      return "Создан";
    case "IN_WAREHOUSE":
      return "На складе";
    case "DELIVERING":
      return "В доставке";
    case "COMPLETED":
      return "Завершён";
    case "CANCELLED":
      return "Отменён";
  }
}

function getOrderStatusBadgeVariant(status: OrderStatus) {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "DELIVERING":
      return "secondary";
    case "IN_WAREHOUSE":
      return "outline";
    case "CREATED":
      return "outline";
    case "CANCELLED":
      return "destructive";
  }
}

function getPaymentBadgeVariant(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return "default";
    case "PARTIAL":
      return "secondary";
    case "UNPAID":
      return "outline";
  }
}
