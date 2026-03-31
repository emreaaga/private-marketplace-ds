"use client";

import { useMemo, useState, useTransition } from "react";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ConfirmArrivalDialog, useConfirmArrival } from "@/entities/flight";
import { createFlightsColumns } from "@/entities/flight/ui";
import { UserAuth } from "@/entities/user";
import { DataTable } from "@/widgets/data-table/ui/data-table";

const EditFlightDialog = dynamic(() => import("@/features/flight-edit").then((mod) => mod.EditFlightDialog), {
  ssr: false,
});

const TripCreateDialog = dynamic(() => import("@/features/trips-create").then((mod) => mod.TripCreateDialog), {
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
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const [createTripFlightId, setCreateTripFlightId] = useState<number | null>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();

  const { mutate: confirmCustoms, isPending: isConfirming } = useConfirmArrival();

  const onPageChange = (next: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", next.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleConfirmSubmit = () => {
    if (!confirmId) return;

    confirmCustoms(confirmId, {
      onSuccess: () => {
        setConfirmId(null);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const columns = useMemo(
    () =>
      createFlightsColumns(
        setEditId,
        (id) => setConfirmId(id),
        (id) => setCreateTripFlightId(id), // Функция для открытия модалки создания маршрута
        user,
      ),
    [user],
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
        renderExpandedRow={(row) => <FlightExpandedRow row={row} />}
      />

      {editId !== null && (
        <EditFlightDialog open={true} flightId={editId} onOpenChangeAction={(open) => !open && setEditId(null)} />
      )}

      <TripCreateDialog
        open={createTripFlightId !== null}
        flightId={createTripFlightId}
        onOpenChangeAction={(open) => !open && setCreateTripFlightId(null)}
      />

      <ConfirmArrivalDialog
        isOpen={confirmId !== null}
        isLoading={isConfirming}
        onClose={() => setConfirmId(null)}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
}
