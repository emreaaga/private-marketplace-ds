"use client";

import { useState, useEffect } from "react";

import { servicesService } from "@/features/services/api/services";
import { servicesColumns } from "@/features/services/ui/organisms/services-columns";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import type { Service } from "@/shared/types/services/services.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesService
      .getServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <UsersToolbar />
      <DataTable
        columns={servicesColumns}
        data={services}
        emptyMessage={loading ? "Загрузка..." : "Сервисы не найдены"}
      />
    </div>
  );
}
