import { useEffect, useState } from "react";

import { usersService } from "@/features/users/api/users";
import { MOCK_USERS } from "@/features/users/fake-users";
import type { User } from "@/features/users/types/user.types";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO === "true";

export function useUsers() {
  const [users, setUsers] = useState<User[]>(() => (IS_DEMO ? MOCK_USERS : []));
  const [isLoading, setIsLoading] = useState(() => !IS_DEMO);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (IS_DEMO) return;

    let isCancelled = false;

    usersService
      .getUsers()
      .then((data) => {
        if (!isCancelled) {
          setUsers(data);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    users,
    setUsers,
    isLoading,
    error,
  };
}
