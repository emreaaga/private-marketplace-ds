import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface FetchOptions extends RequestInit {
  params?: Record<string, any>;
  tags?: string[];
  revalidate?: number;
}

export async function fetchWithAuth<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const url = new URL(`${BASE_URL}${endpoint}`);
  if (options.params) {
    Object.entries(options.params).forEach(([key, val]) => {
      if (val !== undefined) url.searchParams.append(key, String(val));
    });
  }

  const fetchConfig: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${token}`,
      ...options.headers,
    },
    next: {
      revalidate: options.revalidate ?? 60,
      tags: options.tags,
    },
  };

  let res = await fetch(url.toString(), fetchConfig);

  if (res.status === 401) {
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) redirect("/login");

    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });

    if (!refreshRes.ok) redirect("/login");

    const setCookieHeader = refreshRes.headers.get("set-cookie");
    const newToken = setCookieHeader
      ?.split(";")
      .find((c) => c.trim().startsWith("access_token="))
      ?.split("=")[1];

    if (newToken) {
      res = await fetch(url.toString(), {
        ...fetchConfig,
        headers: {
          ...fetchConfig.headers,
          Cookie: `access_token=${newToken}`,
        },
      });
    }
  }

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
