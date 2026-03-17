import { Scale, Package, CreditCard } from "lucide-react";

import { ServicePrice } from "./services.pricing";

export const SERVICE_PRICING_META: Record<
  ServicePrice,
  {
    label: string;
    Icon: React.FC<{ className?: string }>;
  }
> = {
  per_kg: {
    label: "За кг",
    Icon: Scale,
  },
  per_item: {
    label: "За ед",
    Icon: Package,
  },
  fixed: {
    label: "фикс",
    Icon: CreditCard,
  },
};
