export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "manager";
  status: "active" | "pending" | "blocked";
  created_at: string;
};
