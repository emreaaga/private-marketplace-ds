"use client";

import { api } from "@/lib/api";
import type { User } from "@/types/users";

export const usersService = {
  async getUsers(): Promise<User[]> {
    const { data } = await api.get("/users");
    return data.users;
  },

  async deleteUser(userId: number) {
    await api.delete(`/users/${userId}`);
  },

  async changeStatus(userId: number, status: string) {
    await api.patch(`/users/${userId}/status`, { status });
  },

  async changeRole(userId: number, role: string) {
    await api.patch(`/users/${userId}/role`, { role });
  },
};
