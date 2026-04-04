import { useRouter } from "next/navigation";

import { revalidateDirectory } from "./directory-actions";

export function useInvalidateDirectory() {
  const router = useRouter();

  const invalidate = async () => {
    await revalidateDirectory();
    router.refresh();
  };

  return { invalidate };
}
