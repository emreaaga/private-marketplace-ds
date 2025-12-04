"use client";

import { useState } from "react";

import { Copy, RefreshCcw, Link as LinkIcon, Check } from "lucide-react";

import { copyStoreLink, generateNewStoreLink } from "@/features/clients/lib/store-link";
import { Button } from "@/shared/ui/atoms/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/atoms/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

type ExpireAfter = "never" | "7d" | "30d";

export function StoreLinkCard() {
  const [storeUrl, setStoreUrl] = useState("https://dashboard.crocopay.uz/seller/emir-nuts");
  const [expireAfter, setExpireAfter] = useState<ExpireAfter>("never");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyStoreLink(storeUrl, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRegenerate = () => {
    setStoreUrl(generateNewStoreLink(storeUrl));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <LinkIcon className="h-5 w-5" />
          Ссылка на витрину
        </CardTitle>

        <p className="text-muted-foreground hidden text-sm sm:block">
          Поделитесь этой ссылкой с клиентами для доступа к каталогу.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-muted/40 flex min-w-0 flex-1 items-center rounded-lg border px-3 py-2 text-sm">
              <span className="truncate">{storeUrl}</span>
            </div>

            <Button type="button" variant="outline" size="icon" onClick={handleRegenerate} className="h-9 w-9 shrink-0">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="flex-1" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="mr-1 h-2 w-2" />
                Скопировано
              </>
            ) : (
              <>
                <Copy className="mr-1 h-2 w-2" />
                Копировать
              </>
            )}
          </Button>

          <Select value={expireAfter} onValueChange={(value) => setExpireAfter(value as ExpireAfter)}>
            <SelectTrigger className="w-[130px] shrink-0">
              <SelectValue placeholder="Срок" />
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
