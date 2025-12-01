"use client";

import { useState } from "react";

import { Copy, RefreshCcw, Link as LinkIcon, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ExpireAfter = "never" | "7d" | "30d";

export function StoreLinkCard() {
  const [storeUrl, setStoreUrl] = useState("https://dashboard.crocopay.uz/seller/emir-nuts");
  const [expireAfter, setExpireAfter] = useState<ExpireAfter>("never");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!navigator?.clipboard) return;

    navigator.clipboard
      .writeText(storeUrl)
      .then(() => {
        setCopied(true);
        toast.success("Ссылка скопирована");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Не удалось скопировать");
      });
  };

  const handleRegenerate = () => {
    const random = Math.random().toString(36).slice(2, 8);
    setStoreUrl(`https://dashboard.crocopay.uz/seller/emir-nuts-${random}`);
    toast.success("Ссылка обновлена");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Ссылка на витрину
        </CardTitle>
        <CardDescription>Поделитесь этой ссылкой с клиентами для доступа к каталогу.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>URL вашей витрины</Label>
          <div className="flex flex-col gap-2">
            <div className="bg-muted/40 flex min-w-0 items-center rounded-lg border px-3 py-2.5 text-sm">
              <span className="truncate">{storeUrl}</span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="button" variant="outline" className="w-full sm:flex-1" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Скопировано
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Копировать
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleRegenerate}
                className="w-full sm:w-auto sm:shrink-0"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground text-xs">При обновлении ссылки старая перестанет работать.</p>
        </div>

        <div className="space-y-2">
          <Label>Срок действия ссылки</Label>
          <Select value={expireAfter} onValueChange={(value) => setExpireAfter(value as ExpireAfter)}>
            <SelectTrigger>
              <SelectValue placeholder="Бессрочно" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Бессрочно</SelectItem>
              <SelectItem value="7d">7 дней</SelectItem>
              <SelectItem value="30d">30 дней</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
