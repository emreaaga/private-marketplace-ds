import type { User } from "@/types/users";

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "Demo Admin",
    email: "admin@demo.com",
    role: "admin",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "John Manager",
    email: "manager@demo.com",
    role: "manager",
    status: "pending",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Alice User",
    email: "user@demo.com",
    role: "user",
    status: "blocked",
    created_at: new Date().toISOString(),
  },
];
