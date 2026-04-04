import { LayoutGrid, Plane, ShieldCheck, StoreIcon, Warehouse } from "lucide-react";

import { AllCompanyType, CompanyType } from "./company.types";

export const COMPANY_TYPE_META: Record<CompanyType, { label: string; Icon: React.FC<{ className?: string }> }> = {
  postal: {
    label: "Почта",
    Icon: Warehouse,
  },
  air_partner: {
    label: "Диспетчер",
    Icon: Plane,
  },
  customs_broker: {
    label: "Таможня",
    Icon: ShieldCheck,
  },
  seller: {
    label: "Продавец",
    Icon: StoreIcon,
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
