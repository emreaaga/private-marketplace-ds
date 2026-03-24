import { getServerSession } from "@/entities/session/server";
import { getUsers } from "@/entities/user/api/get-users-server.api";
import { UsersTableClient } from "@/widgets/users-table";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getServerSession();
  const currentPage = Number(params.page) || 1;

  if (!user) return null;

  const fetchParams = {
    page: currentPage,
    ...(user.role !== "admin" && { companyId: user.company_id }),
  };

  const data = await getUsers(fetchParams);

  return <UsersTableClient initialData={data.data} pageCount={data.pagination.totalPages} currentPage={currentPage} />;
}
