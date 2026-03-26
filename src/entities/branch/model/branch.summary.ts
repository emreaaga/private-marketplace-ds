import { CountryCode } from "@/entities/geography";

export type BranchSummary = {
  branch_id: number;
  to_city: CountryCode;
  orders_count: string;
  total_prepaid: string;
  total_remaining: string;
  total_weight: string;
};
