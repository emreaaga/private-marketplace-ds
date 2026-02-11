"use client";

import { api } from "@/shared/lib/api";
import type { User, UserDetail } from "@/shared/types/users";

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

  async getUser(userId: number, signal: AbortSignal): Promise<UserDetail> {
    const { data } = await api.get(`/users/${userId}`, { signal });

    return data.data;
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
