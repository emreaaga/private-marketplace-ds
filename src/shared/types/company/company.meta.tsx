import { LayoutGrid, Plane, PlaneTakeoff, ShieldCheck, Warehouse } from "lucide-react";

import { AllCompanyType, CompanyType } from "@/shared/types/company/company.types";

export const COMPANY_TYPE_META: Record<CompanyType, { label: string; Icon: React.FC<{ className?: string }> }> = {
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

export const ALL_COMPANY_TYPE_META: Record<AllCompanyType, { label: string; Icon: React.FC<{ className?: string }> }> =
  {
    ...COMPANY_TYPE_META,
    platform: {
      label: "Платформа",
      Icon: LayoutGrid,
    },
  };
