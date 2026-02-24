import { Plane, Gavel, Package, LucideIcon, FileText } from "lucide-react";

export const EXPENSE_TYPE_CONFIG: Record<string, { label: string; Icon: LucideIcon }> = {
  aircraft: { label: "Авиапартнер", Icon: Plane },
  customs: { label: "Таможня", Icon: Gavel },
  handling: { label: "Обработка", Icon: Package },
  other: { label: "Прочее", Icon: FileText },
};
