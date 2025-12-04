import "@tanstack/react-table";
import type { User } from "@/features/users/types/user.types";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onDelete?: (id: number) => void;
    onRoleChange?: (id: number, role: User["role"]) => void;
    onStatusChange?: (id: number, status: User["status"]) => void;
  }
}
