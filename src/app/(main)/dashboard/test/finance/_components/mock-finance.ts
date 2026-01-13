import { FinancialEvent } from "./financial-event";

export const MOCK_FINANCIAL_EVENTS: FinancialEvent[] = [
  {
    id: "FE-001",
    orderId: "ORD-001",
    type: "CLIENT_PAYMENT",
    direction: "INCOME",
    amountUsd: 40,
    createdAt: "2026-01-10",
    createdBy: "Courier",
  },
  {
    id: "FE-002",
    orderId: "ORD-001",
    type: "CUSTOMS_FEE",
    direction: "EXPENSE",
    amountUsd: 6,
    comment: "Экспорт",
    createdAt: "2026-01-12",
    createdBy: "Post Admin",
  },
  {
    id: "FE-003",
    orderId: "ORD-001",
    type: "CUSTOMS_PENALTY",
    direction: "EXPENSE",
    amountUsd: 4,
    comment: "Ошибочный вес",
    createdAt: "2026-01-13",
    createdBy: "Customs",
  },
  {
    id: "FE-004",
    orderId: "ORD-001",
    type: "CLIENT_PAYMENT",
    direction: "INCOME",
    amountUsd: 38,
    createdAt: "2026-01-18",
    createdBy: "Courier",
  },
];
