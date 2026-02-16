"use client";

import { api } from "@/shared/lib/api";
import { PaginatedResponse } from "@/shared/types/paginated-response";
import type { User, UserDetail } from "@/shared/types/users";

import type { CreateUserDto } from "../types/create-user.dto";

export const usersService = {
  async getUsers(params: { page: number }, signal?: AbortSignal): Promise<PaginatedResponse<User>> {
    const { data } = await api.get<PaginatedResponse<User>>("/users", {
      params: { page: params.page },
      signal,
    });

    return data;
  },

  async createUser(payload: CreateUserDto): Promise<User> {
    const { data } = await api.post("/users", payload);
    return data.user;
  },

  async getUser(userId: number, signal?: AbortSignal): Promise<UserDetail> {
    const { data } = await api.get(`/users/${userId}`, { signal });
    return data.data;
  },

  async updateUser(userId: number, payload: Partial<UserDetail>): Promise<UserDetail> {
    const { data } = await api.patch(`/users/${userId}`, payload);
    return data.data;
  },

  async deleteUser(userId: number) {
    await api.delete(`/users/${userId}`);
  },
};
