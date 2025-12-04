"use client";

import { useState } from "react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/atoms/card";
import { Label } from "@/shared/ui/atoms/label";
import { Switch } from "@/shared/ui/atoms/switch";

export function AccessSettingsCard() {
  const [requireRegistration, setRequireRegistration] = useState(true);
  const [requireApproval, setRequireApproval] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки доступа</CardTitle>
        <CardDescription>Определите правила доступа к каталогу.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Требовать регистрацию</Label>
            <p className="text-muted-foreground text-sm">Клиент должен создать аккаунт перед просмотром.</p>
          </div>
          <Switch checked={requireRegistration} onCheckedChange={setRequireRegistration} className="sm:shrink-0" />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 space-y-1">
            <Label className="text-base">Ручное подтверждение</Label>
            <p className="text-muted-foreground text-sm">Новые клиенты попадают на модерацию.</p>
          </div>
          <Switch checked={requireApproval} onCheckedChange={setRequireApproval} className="sm:shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}
