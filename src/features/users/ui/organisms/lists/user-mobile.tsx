import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";
import { UserCardMobile } from "@/features/users/ui/card-mobile";
import { UserActions } from "@/features/users/ui/user-actions";

interface UsersListMobileProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
  onRoleChange?: (id: number, role: UserRole) => void;
  onStatusChange?: (id: number, status: UserStatus) => void;
}

export function UsersListMobile({ users, onEdit, onDelete, onRoleChange, onStatusChange }: UsersListMobileProps) {
  if (!users.length) {
    return <div className="text-muted-foreground py-8 text-center text-sm">Нет результатов</div>;
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-lg border md:hidden">
      <div className="divide-border divide-y">
        {users.map((user) => {
          const handleEdit = () => onEdit?.(user);
          const handleDelete = () => onDelete?.(user.id);
          const handleRoleChange = (role: UserRole) => onRoleChange?.(user.id, role);
          const handleStatusChange = (status: UserStatus) => onStatusChange?.(user.id, status);

          return (
            <UserCardMobile
              key={user.id}
              user={user}
              actions={
                <UserActions
                  user={user}
                  variant="mobile"
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onRoleChange={handleRoleChange}
                  onStatusChange={handleStatusChange}
                />
              }
            />
          );
        })}
      </div>
    </div>
  );
}
