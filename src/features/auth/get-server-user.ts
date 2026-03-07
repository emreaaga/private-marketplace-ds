import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { UserAuth } from "@/shared/types/users/user.auth";

export async function getServerUser(): Promise<UserAuth> {
  const cookieStore = await cookies();
  const meta = cookieStore.get("user_metadata")?.value;

  if (!meta) {
    redirect("/auth/login");
  }

  try {
    return JSON.parse(decodeURIComponent(meta));
  } catch {
    redirect("/auth/login");
  }
}
