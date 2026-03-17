import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SessionUser } from "../model/store";

export async function getServerSession(): Promise<SessionUser> {
  const cookieStore = await cookies();
  const meta = cookieStore.get("user_metadata")?.value;

  if (!meta) redirect("/auth/login");

  try {
    return JSON.parse(decodeURIComponent(meta));
  } catch {
    redirect("/auth/login");
  }
}
