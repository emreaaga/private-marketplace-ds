import { useRouter } from "next/navigation";

import { revalidateUsers } from "../api/users-actions";

export function useInvalidateUsers() {
  const router = useRouter();

  const invalidate = async () => {
    await revalidateUsers();

    router.refresh();
  };

  return { invalidate };
}
