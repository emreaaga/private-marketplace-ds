import { Plane, ShieldCheck, LayoutDashboard, Warehouse, PlaneTakeoff } from "lucide-react";

import { CompanyType } from "@/shared/types/company/company.types";

export const COMPANY_TYPE_META: Record<CompanyType, { label: string; Icon: React.FC<{ className?: string }> }> = {
  platform: {
    label: "Система",
    Icon: LayoutDashboard,
  },
  postal: {
    label: "Почта",
    Icon: Warehouse,
  },
  air_partner: {
    label: "Авиа",
    Icon: Plane,
  },
  airline: {
    label: "Авиалиния",
    Icon: PlaneTakeoff,
  },
  customs_broker: {
    label: "Таможня",
    Icon: ShieldCheck,
  },
};
