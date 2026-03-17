"use client";

import { useCallback, useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { Service } from "@/entities/service/model/services.model";
import { useServicesList } from "@/entities/service/queries/use-services-list";
import { useUpdateService } from "@/entities/service/queries/use-update-service";
import { createServicesColumns } from "@/entities/service/ui/services-columns";
import { DataTable } from "@/widgets/data-table/ui/data-table";

const ServiceEditDialog = dynamic(() => import("@/features/service-edit").then((m) => m.ServiceEditDialog), {
  ssr: false,
});

export default function ServicesPage() {
  const [page, setPage] = useState(1);
  const [editOpen, setEditOpen] = useState(false);
  const [editServiceId, setEditServiceId] = useState<number | null>(null);

  const { data } = useServicesList({ page });

  const updateService = useUpdateService();

  const handleEdit = useCallback((service: Service) => {
    setEditServiceId(service.id);
    setEditOpen(true);
  }, []);

  const columns = useMemo(() => createServicesColumns({ onEdit: handleEdit }), [handleEdit]);

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        serverPagination={{
          page,
          pageCount: data?.pagination.totalPages ?? 1,
          onPageChange: setPage,
        }}
      />

      {editOpen && (
        <ServiceEditDialog
          open={editOpen}
          serviceId={editServiceId}
          onOpenChangeAction={(open) => {
            setEditOpen(open);
            if (!open) setEditServiceId(null);
          }}
          onSubmitAction={async (id, values) => {
            await updateService.mutateAsync({ id, payload: values });
          }}
        />
      )}
    </div>
  );
}
