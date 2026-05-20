import { getClients } from "@/entities/client/api-server/get-clients-server.api";
import { getServerSession } from "@/entities/session/server";
import { ClientsTableClient } from "@/widgets/clients-table";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ClientsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getServerSession();
  const currentPage = Number(params.page) || 1;

  if (!user) return null;

  const fetchParams = {
    page: currentPage,
    limit: 10,
  };

  const data = await getClients(fetchParams);

  return <ClientsTableClient data={data.data} pageCount={data.pagination.totalPages} currentPage={currentPage} />;
}
