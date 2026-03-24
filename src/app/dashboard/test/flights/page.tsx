import { getFlights } from "@/entities/flight/api-server/get-flights";
import { getServerSession } from "@/entities/session/server";
import { FlightsTableClient } from "@/widgets/flights-table";
import { FlightsToolbar } from "@/widgets/flights-toolbar";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function FlightsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const data = await getFlights({ page: currentPage });

  const user = await getServerSession();
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
