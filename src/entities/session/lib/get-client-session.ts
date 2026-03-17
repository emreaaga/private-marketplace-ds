import Cookies from "js-cookie";

import { SessionUser } from "../model/store";

export function getClientSession(): SessionUser | null {
  const meta = Cookies.get("user_metadata");
  if (!meta) return null;

  try {
    return JSON.parse(decodeURIComponent(meta));
  } catch (error) {
    console.error("Failed to parse user metadata", error);
    return null;
  }
}
