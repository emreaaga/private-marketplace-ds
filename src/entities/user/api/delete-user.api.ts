import { api } from "@/shared/api";

export const deleteUserApi = async (userId: number) => {
  await api.delete(`/users/${userId}`);
};
