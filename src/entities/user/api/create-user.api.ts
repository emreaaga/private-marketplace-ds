import { api } from "@/shared/api";

import { CreateUserDto } from "../model/create-user.dto";
import type { User } from "../model/user.model";

export const createUserApi = async (payload: CreateUserDto) => {
  const { data } = await api.post<{ user: User }>("/users", payload);
  return data.user;
};
