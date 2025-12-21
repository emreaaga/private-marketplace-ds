import type { User } from "@/features/users/types/user.types";

export const MOCK_USERS: User[] = [
  {
    id: 1,
    public_id: "B1003",
    name: "client1",
    email: "client1@gmail.com",
    role: "admin",
    status: "active",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    public_id: "B1004",
    name: "client2",
    email: "client2@gmail.com",
    role: "seller",
    status: "pending",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    public_id: "B1005",
    name: "client3",
    email: "client3@gmail.com",
    role: "customer",
    status: "blocked",
    created_at: new Date().toISOString(),
  },
];
