import Cookies from "js-cookie";

import { AuthUser } from "./auth.store";

export function getClientUser(): AuthUser | null {
  const meta = Cookies.get("user_metadata");
  if (!meta) return null;

  try {
    return JSON.parse(decodeURIComponent(meta));
  } catch (error) {
    console.error("Failed to parse user metadata", error);
    return null;
  }
}
