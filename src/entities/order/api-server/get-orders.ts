import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { PaginatedResponse } from "@/shared/api";

import type { OrderListItem } from "../api/types/orders.types";

export async function getOrders({ page }: { page: number }): Promise<PaginatedResponse<OrderListItem>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  let res = await fetch(`${baseUrl}/orders?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${token}`,
    },
    next: {
      revalidate: 60,
      tags: ["orders"],
    },
  });

  if (res.status === 401) {
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) redirect("/login");

    const refreshRes = await fetch(`${baseUrl}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (!refreshRes.ok) {
      redirect("/login");
    }

    const setCookieHeader = refreshRes.headers.get("set-cookie");
    const newToken = setCookieHeader
      ?.split(";")
      .find((c) => c.trim().startsWith("access_token="))
      ?.split("=")[1];

    if (newToken) {
      res = await fetch(`${baseUrl}/orders?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `access_token=${newToken}`,
        },
      });
    }
  }

  if (!res.ok) {
    throw new Error(`Ошибка сервера: ${res.status}`);
  }

  return res.json();
}
