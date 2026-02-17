"use client";

import { useCallback, useMemo, useState } from "react";

import { useServicesList } from "@/features/services/queries/use-services-list";
import { useUpdateService } from "@/features/services/queries/use-update-service";
import { ServiceEditDialog } from "@/features/services/ui/organisms/service-edit-dialog";
import { createServicesColumns } from "@/features/services/ui/organisms/services-columns";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import { Service } from "@/shared/types/services/services.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

export default function ServicesPage() {
  const [page, setPage] = useState(1);
  const [editOpen, setEditOpen] = useState(false);
  const [editServiceId, setEditServiceId] = useState<number | null>(null);

  const { data, isLoading, isError } = useServicesList({ page });
  const updateService = useUpdateService();

  const handleEdit = useCallback((service: Service) => {
    setEditServiceId(service.id);
    setEditOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      createServicesColumns({
        onView: handleEdit,
      }),
    [handleEdit],
  );

  return (
    <div className="space-y-4">
      <UsersToolbar />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        serverPagination={{ page, pageCount: data?.pagination.totalPages ?? 1, onPageChange: setPage }}
      />

      <ServiceEditDialog
        open={editOpen}
        serviceId={editServiceId}
        onOpenChangeAction={(open) => {
          setEditOpen(open);
          if (!open) setTimeout(() => setEditServiceId(null), 200);
        }}
        onSubmitAction={async (id, values) => {
          await updateService.mutateAsync({ id, payload: values });
        }}
      />
    </div>
  );
}
