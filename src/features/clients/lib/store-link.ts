import { toast } from "sonner";

export async function copyStoreLink(url: string, onCopied?: () => void) {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Ссылка скопирована");
    onCopied?.();
  } catch {
    toast.error("Не удалось скопировать");
  }
}

export function generateNewStoreLink(baseUrl: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  const newUrl = `${baseUrl}-${random}`;
  toast.success("Ссылка обновлена");
  return newUrl;
}
