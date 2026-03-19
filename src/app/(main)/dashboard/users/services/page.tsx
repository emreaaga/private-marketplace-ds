"use client";

import { useCallback, useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { createServicesColumns } from "@/entities/service";
import { Service } from "@/entities/service/model/services.model";
import { useServicesList } from "@/entities/service/queries/use-services-list";
import { DataTable } from "@/widgets/data-table/ui/data-table";

const ServiceViewDialog = dynamic(() => import("@/features/service-detail").then((m) => m.ServiceViewDialog), {
  ssr: false,
});

export default function ServicesPage() {
  const [page, setPage] = useState(1);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewServiceId, setViewServiceId] = useState<number | null>(null);

  const { data } = useServicesList({ page });

  const handleView = useCallback((service: Service) => {
    setViewServiceId(service.id);
    setViewOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      createServicesColumns({
        onEdit: handleView,
      }),
    [handleView],
  );

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

      {viewOpen && (
        <ServiceViewDialog
          open={viewOpen}
          serviceId={viewServiceId}
          onOpenChangeAction={(open) => {
            setViewOpen(open);
            if (!open) setViewServiceId(null);
          }}
        />
      )}
    </div>
  );
}
