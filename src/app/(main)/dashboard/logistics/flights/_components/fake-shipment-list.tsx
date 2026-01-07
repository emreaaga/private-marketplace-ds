export interface Shipment {
  id: string;
  code: string;
  boxesCount: number;
  weightKg: number;
  status: "ready" | "preparing";
}

export interface Company {
  companyId: string;
  companyName: string;
  hasDebt: boolean;
  debtAmount: number;
  shipments: Shipment[];
}

export interface CompanyShipment {
  companyId: string;
  companyName: string;
  hasDebt: boolean;
  debtAmount: number;
  shipment: Shipment;
}

export const AVAILABLE_COMPANIES: Company[] = [
  {
    companyId: "c1",
    companyName: "Faravon express",
    hasDebt: false,
    debtAmount: 0,
    shipments: [
      { id: "s1", code: "001", boxesCount: 12, weightKg: 180, status: "ready" },
      { id: "s2", code: "002", boxesCount: 5, weightKg: 60, status: "preparing" },
    ],
  },
  {
    companyId: "c2",
    companyName: "Zamon express",
    hasDebt: true,
    debtAmount: 1250,
    shipments: [{ id: "s3", code: "003", boxesCount: 7, weightKg: 95, status: "ready" }],
  },
];
