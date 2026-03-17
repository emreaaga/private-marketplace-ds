"use server";

import { revalidateTag } from "next/cache";

export async function revalidateFlights() {
  revalidateTag("flights", "default");
}
