import { useEffect, useState } from "react";

import { usersService } from "@/features/users/api/users";
import type { User } from "@/features/users/types/user.types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    usersService
      .getUsers()
      .then((data) => {
        if (!isCancelled) {
          setUsers(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isCancelled) setError(err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return { users, setUsers, isLoading, error };
}
