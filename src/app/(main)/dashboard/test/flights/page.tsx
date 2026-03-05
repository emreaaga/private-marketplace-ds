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

  return (
    <div className="space-y-4">
      <FlightsToolbar />

      <FlightsTableClient initialData={data.data} pageCount={data.pagination.totalPages} currentPage={currentPage} />
    </div>
  );
}
