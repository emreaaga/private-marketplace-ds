"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Field, FieldLabel, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import type { User } from "@/types/users";

export function EditUserDialog({
  user,
  open,
  onOpenChange,
  onSave,
}: {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: { role: User["role"]; status: User["status"] }) => Promise<void>;
}) {
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  const handleSubmit = async () => {
    await onSave({ role, status });
    onOpenChange(false);
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
                <Select value={role} onValueChange={(v) => setRole(v as User["role"])}>
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Админ</SelectItem>
                    <SelectItem value="manager">Менеджер</SelectItem>
                    <SelectItem value="user">Пользователь</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Статус</FieldLabel>
                <Select value={status} onValueChange={(v) => setStatus(v as User["status"])}>
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
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
