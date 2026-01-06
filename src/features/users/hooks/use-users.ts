import { useEffect, useState } from "react";

import { usersService } from "@/features/users/api/users";
import type { User } from "@/features/users/types/user.types";

export function useUsers(initialUsers: User[]) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState<boolean>(initialUsers.length === 0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (initialUsers.length > 0) return;

    let cancelled = false;

    usersService
      .getUsers()
      .then((data) => {
        if (!cancelled) {
          setUsers(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [initialUsers]);

  return { users, setUsers, isLoading, error };
}
