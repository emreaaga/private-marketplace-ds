export const USER_STATUSES = {
  ACTIVE: "active",
  PENDING: "pending",
  BLOCKED: "blocked",
} as const;

export type UserStatus = (typeof USER_STATUSES)[keyof typeof USER_STATUSES];

export type Client = {
  id: number;
  public_id: string;
  name: string;
  status: UserStatus;
  orders_count: number;
  total_spent: number;
  city: string;
  created_at: string;
};
