import type { User } from "@/features/users/types/user.types";

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "Asat",
    email: "admin@demo.com",
    role: "admin",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Tarlan",
    email: "manager@demo.com",
    role: "manager",
    status: "pending",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Emre",
    email: "user@demo.com",
    role: "user",
    status: "blocked",
    created_at: new Date().toISOString(),
  },
];
