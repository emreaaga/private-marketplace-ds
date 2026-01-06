import { mockUsers } from "@/features/users/fake-users";
import type { User } from "@/features/users/types/user.types";
import { UsersClient } from "@/features/users/ui/organisms/sections/users-client";

export default function UsersMainPage() {
  const initialUsers: User[] = mockUsers;

  return (
    <div className="space-y-4">
      <UsersClient initialUsers={initialUsers} />
    </div>
  );
}
