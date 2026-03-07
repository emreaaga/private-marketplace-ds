import { useRouter } from "next/navigation";

import { revalidateFlights } from "../api/flights-actions";

export function useInvalidateFlights() {
  const router = useRouter();

  const invalidate = async () => {
    await revalidateFlights();
    router.refresh();
  };

  return { invalidate };
}
