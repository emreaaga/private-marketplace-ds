"use client";

export interface Shipment {
  id: string;
  code: string;
}

export interface CompanyShipments {
  companyId: string;
  companyName: string;
  shipments: Shipment[];
}

const MOCK_DATA: CompanyShipments[] = [
  {
    companyId: "c1",
    companyName: "Faravon express",
    shipments: [{ id: "s1", code: "001" }],
  },
  {
    companyId: "c2",
    companyName: "Zamon express",
    shipments: [{ id: "s3", code: "002" }],
  },
];

export function ShipmentList() {
  return (
    <div className="divide-y rounded-md text-xs">
      {MOCK_DATA.map((company) => (
        <div key={company.companyId} className="flex items-center gap-3 px-3 py-2">
          <span className="w-40 shrink-0 truncate font-medium">{company.companyName}</span>

          <div className="flex min-w-0 flex-wrap gap-x-2 gap-y-0.5">
            {company.shipments.map((shipment) => (
              <span key={shipment.id} className="text-muted-foreground font-mono text-[11px] whitespace-nowrap">
                {shipment.code}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
