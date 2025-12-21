import { useState } from "react";

import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/shared/ui/atoms/dialog";
import { Field, FieldLabel, FieldGroup, FieldSet } from "@/shared/ui/atoms/field";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/shared/ui/atoms/select";

interface EditUserFormProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: { role: UserRole; status: UserStatus }) => Promise<void>;
}

export function EditUserForm({ user, open, onOpenChange, onSave }: EditUserFormProps) {
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await onSave({ role, status });
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Редактировать пользователя</DialogTitle>
        </DialogHeader>

        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Имя</FieldLabel>
              <Input
                disabled
                value={user.name}
                className="bg-muted border-muted-foreground/30 h-10 cursor-not-allowed"
              />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                disabled
                value={user.email}
                className="bg-muted border-muted-foreground/30 h-10 cursor-not-allowed"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Роль</FieldLabel>
                <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Админ</SelectItem>
                    <SelectItem value="seller">Продавец</SelectItem>
                    <SelectItem value="customer">Клиент</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Статус</FieldLabel>
                <Select value={status} onValueChange={(v) => setStatus(v as UserStatus)}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Активен</SelectItem>
                    <SelectItem value="pending">В ожидании</SelectItem>
                    <SelectItem value="blocked">Заблокирован</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Отмена
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
