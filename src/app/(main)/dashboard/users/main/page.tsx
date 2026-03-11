import { getServerUser } from "@/features/auth/get-server-user";
import { getUsers } from "@/features/users/api/get-users";

import { UsersTableClient } from "./_components/users-table-client";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const user = await getServerUser();
  const currentPage = Number(params.page) || 1;

  if (!user) return null;

  const fetchParams = {
    page: currentPage,
    ...(user.role !== "admin" && { companyId: user.company_id }),
  };

  const data = await getUsers(fetchParams);

  return <UsersTableClient initialData={data.data} pageCount={data.pagination.totalPages} currentPage={currentPage} />;
}
