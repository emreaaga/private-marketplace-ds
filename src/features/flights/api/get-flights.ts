import { Flight } from "@/shared/types/flight/flight.model";
import { PaginatedResponse } from "@/shared/types/paginated-response";

export async function getFlights({ page }: { page: number }): Promise<PaginatedResponse<Flight>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

  const res = await fetch(`${baseUrl}/flights?page=${page}`, {
    next: {
      revalidate: 60,
      tags: ["flights"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch flights");
  }

  return res.json();
}
