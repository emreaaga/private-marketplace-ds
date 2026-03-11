import { getServerUser } from "@/features/auth/get-server-user";
import { getFlights } from "@/features/flights/api/get-flights";

import { FlightsTableClient } from "./_components/flights-table-client";
import { FlightsToolbar } from "./_components/flights-toolbar";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function FlightsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const data = await getFlights({ page: currentPage });

  const user = await getServerUser();
  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-4">
      <FlightsToolbar canCreate={isAdmin} />

      <FlightsTableClient
        initialData={data.data}
        pageCount={data.pagination.totalPages}
        currentPage={currentPage}
        user={user}
      />
    </div>
  );
}
