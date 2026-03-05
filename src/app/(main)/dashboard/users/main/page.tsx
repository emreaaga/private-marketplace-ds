import { getUsers } from "@/features/users/api/get-users";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";

import { UsersTableClient } from "./_components/users-table-client";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const data = await getUsers({ page: currentPage });

  return (
    <div className="space-y-4">
      <UsersToolbar />

      <UsersTableClient initialData={data.data} pageCount={data.pagination.totalPages} currentPage={currentPage} />
    </div>
  );
}
