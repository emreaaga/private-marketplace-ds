"use client";

import { useMemo, useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createClientsColumns } from "@/entities/client";
import { DataTable } from "@/widgets/data-table/ui/data-table";

interface ClientsTableClientProps {
  data: any[];
  pageCount: number;
  currentPage: number;
}

export function ClientsTableClient({ data, pageCount, currentPage }: ClientsTableClientProps) {
  const [isPending, startTransition] = useTransition();

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

  const columns = useMemo(() => createClientsColumns(), []);

  return (
    <div
      className={
        isPending ? "pointer-events-none opacity-50 transition-opacity duration-200" : "transition-opacity duration-200"
      }
    >
      <DataTable
        columns={columns}
        data={data}
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
