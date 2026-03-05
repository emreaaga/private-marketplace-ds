import { PaginatedResponse } from "@/shared/types/paginated-response";
import { User } from "@/shared/types/users";

export async function getUsers({ page }: { page: number }): Promise<PaginatedResponse<User>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const res = await fetch(`${baseUrl}/users?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
      tags: ["users"],
    },
  });

  if (!res.ok) {
    throw new Error(`Ошибка при загрузке пользователей: ${res.statusText}`);
  }

  const data = await res.json();

  return data;
}
