import { FAKE_CLIENTS } from "@/features/clients/fake-clients";
import type { UserStatus } from "@/features/clients/types/client.types";
import { ClientsToolbar } from "@/features/clients/ui/organisms/sections/clients-toolbar";

const STATUS_MAP: Record<UserStatus, { label: string; className: string }> = {
  active: { label: "Акт.", className: "bg-green-500/15 text-green-700 border-green-500/20" },
  pending: { label: "Ожд.", className: "bg-yellow-500/15 text-yellow-700 border-yellow-500/20" },
  blocked: { label: "Заб.", className: "bg-red-500/15 text-red-700 border-red-500/20" },
};

export default function ClientsMainPage() {
  return (
    <div className="space-y-4">
      <ClientsToolbar />

      <div className="border-border overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-border border-b">
            <tr className="text-muted-foreground text-[11px] tracking-wider uppercase">
              <th className="h-9 w-16 px-4 text-left font-semibold">ID</th>
              <th className="h-9 px-4 text-left font-semibold">Клиент</th>
              <th className="h-9 px-4 text-left font-semibold">Город</th>
              <th className="h-9 px-4 text-center font-semibold">Заказы</th>
              <th className="h-9 px-4 text-right font-semibold">Оборот</th>
              <th className="h-9 px-4 text-center font-semibold">Статус</th>
              <th className="h-9 px-4 text-right font-semibold">Создан</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {FAKE_CLIENTS.map((client) => {
              const status = STATUS_MAP[client.status];

              return (
                <tr key={client.public_id} className="hover:bg-muted/30 group transition-colors">
                  <td className="text-muted-foreground px-4 py-2 font-mono text-[10px]">{client.public_id}</td>
                  <td className="px-4 py-2 text-xs font-medium">{client.name}</td>
                  <td className="text-muted-foreground px-4 py-2 text-xs">{client.city}</td>
                  <td className="px-4 py-2 text-center text-xs font-medium">{client.orders_count}</td>
                  <td className="px-4 py-2 text-right text-xs font-semibold whitespace-nowrap">
                    {client.total_spent.toLocaleString("ru-RU")} $
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span
                      className={`inline-flex items-center rounded-xl border px-2 py-0.5 text-[10px] font-bold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="text-muted-foreground px-4 py-2 text-right text-xs">
                    {new Date(client.created_at).toLocaleDateString("ru-RU")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {FAKE_CLIENTS.length === 0 && (
          <div className="text-muted-foreground p-8 text-center text-sm">Клиенты не найдены</div>
        )}
      </div>
    </div>
  );
}
