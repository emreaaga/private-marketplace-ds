"use client";

import { api } from "@/shared/lib/api";
import type { User } from "@/shared/types/users/user.model";

import { CreateUserDto } from "../types/create-user.dto";

export const usersService = {
  async getUsers(): Promise<User[]> {
    const { data } = await api.get("/users");
    return data.users;
  },

  async createUser(payload: CreateUserDto): Promise<User> {
    const { data } = await api.post("/users", payload);
    return data.user;
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
