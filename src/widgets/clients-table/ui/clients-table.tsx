"use client";

import { useMemo, useState, useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createClientsColumns } from "@/entities/client";
import { DataTable } from "@/widgets/data-table/ui/data-table";

export function ClientsTableClient({ initialData, pageCount, currentPage }: any) {
  const [isPending, startTransition] = useTransition();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [viewClientId, setViewClientId] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  const onPageChange = (next: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", next.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const columns = useMemo(
    () =>
      createClientsColumns({
        onView: (client) => setViewClientId(client.id),
      }),
    [],
  );

  return (
    <div className={isPending ? "opacity-70 transition-opacity" : ""}>
      <DataTable
        columns={columns}
        data={initialData}
        serverPagination={{
          page: currentPage,
          pageCount,
          onPageChange,
        }}
        fixedPageSize={10}
      />
    </div>
  );
}
