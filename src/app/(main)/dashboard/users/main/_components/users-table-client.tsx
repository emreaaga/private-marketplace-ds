"use client";

import { useMemo, useState, useTransition } from "react";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useUpdateUser } from "@/features/users/mutations/use-update-user";
import { createUsersColumns } from "@/features/users/ui/organisms/users-columns";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

const EditUserDialog = dynamic(
  () => import("@/features/users/ui/organisms/dialogs/edit-user/edit-user-dialog").then((m) => m.EditUserDialog),
  { ssr: false },
);

export function UsersTableClient({ initialData, pageCount, currentPage }: any) {
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const updateUser = useUpdateUser();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onPageChange = (next: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", next.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const columns = useMemo(() => createUsersColumns({ onEdit: (user) => setEditUserId(user.id) }), []);

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
      />

      {editUserId !== null && (
        <EditUserDialog
          open={true}
          userId={editUserId}
          onOpenChange={(open) => !open && setEditUserId(null)}
          onSubmitAction={async (id, values) => {
            await updateUser.mutateAsync({ id, values });
          }}
        />
      )}
    </div>
  );
}
