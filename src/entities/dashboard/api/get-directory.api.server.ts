import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { COMPANY_TYPE_META, type CompanyType } from "@/entities/company";
import { USER_ROLE_META, type UserRoles } from "@/entities/user";

import { type DirectoryEntity } from "../model/directory.model";

export async function getDirectoryData(): Promise<DirectoryEntity[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${token}`,
    },
    next: {
      revalidate: 3600,
      tags: ["directory"],
    },
  };

  let res = await fetch(`${baseUrl}/dashboard/all-users`, fetchOptions);

  if (res.status === 401) {
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) redirect("/login");

    const refreshRes = await fetch(`${baseUrl}/auth/refresh`, {
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
      res = await fetch(`${baseUrl}/dashboard/all-users`, {
        ...fetchOptions,
        headers: { ...fetchOptions.headers, Cookie: `access_token=${newToken}` },
      });
    }
  }

  if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);

  const raw = await res.json();
  const { data } = raw;

  const userCounts = new Map(data.users.map((u: any) => [u.role, u.total_count]));
  const companyCounts = new Map(data.companies.map((c: any) => [c.type, c.total_count]));

  const users: DirectoryEntity[] = (Object.keys(USER_ROLE_META) as UserRoles[]).map((role) => ({
    id: `role-${role}`,
    label: USER_ROLE_META[role].label,
    category: "user",
    iconKey: role,
    count: Number(userCounts.get(role) ?? 0),
  }));

  const companies: DirectoryEntity[] = (Object.keys(COMPANY_TYPE_META) as CompanyType[]).map((type) => ({
    id: `type-${type}`,
    label: COMPANY_TYPE_META[type].label,
    category: "company",
    iconKey: type,
    count: Number(companyCounts.get(type) ?? 0),
  }));

  return [...users, ...companies];
}
