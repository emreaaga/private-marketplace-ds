"use client";

import { useMemo, useState, useTransition } from "react";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";

import { createFlightsColumns } from "@/entities/flight/ui";
import { UserAuth } from "@/entities/user";
import { DataTable } from "@/widgets/data-table/ui/data-table";

const EditFlightDialog = dynamic(() => import("@/features/flight-edit").then((mod) => mod.EditFlightDialog), {
  ssr: false,
});

const FlightExpandedRow = dynamic(() => import("@/entities/flight/ui").then((mod) => mod.FlightExpandedRow), {
  ssr: false,
});

interface FlightsTableClientProps {
  initialData: any[];
  pageCount: number;
  currentPage: number;
  user: UserAuth | null;
}

export function FlightsTableClient({ initialData, pageCount, currentPage, user }: FlightsTableClientProps) {
  const [editId, setEditId] = useState<number | null>(null);
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

  const handleCustomsConfirm = async (flightId: number) => {
    toast.success(`Статус рейса ${flightId} обновлен`);
  };

  const columns = useMemo(() => createFlightsColumns(setEditId, handleCustomsConfirm, user), [user]);

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
        renderExpandedRow={(row) => <FlightExpandedRow row={row} />}
      />

      {editId !== null && (
        <EditFlightDialog open={true} flightId={editId} onOpenChangeAction={(open) => !open && setEditId(null)} />
      )}
    </div>
  );
}
