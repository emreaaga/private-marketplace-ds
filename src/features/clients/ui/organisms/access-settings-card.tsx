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

        <CardDescription className="hidden sm:block">Определите правила доступа к каталогу.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-base">Требовать регистрацию</Label>

            <Switch
              checked={requireRegistration}
              onCheckedChange={setRequireRegistration}
              className="origin-right scale-125"
            />
          </div>

          <p className="text-muted-foreground hidden text-sm sm:block">
            Клиент должен создать аккаунт перед просмотром.
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-base">Ручное подтверждение</Label>

            <Switch checked={requireApproval} onCheckedChange={setRequireApproval} className="origin-right scale-125" />
          </div>

          <p className="text-muted-foreground hidden text-sm sm:block">Новые клиенты попадают на модерацию.</p>
        </div>
      </CardContent>
    </Card>
  );
}
