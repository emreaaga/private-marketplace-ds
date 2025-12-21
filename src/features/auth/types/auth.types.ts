import { UserRole } from "@/shared/lib/rbac/roles";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export interface AccessTokenPayload {
  sub: string;
  role: UserRole;
}
