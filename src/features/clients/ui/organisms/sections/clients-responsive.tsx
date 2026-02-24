import { FAKE_CLIENTS } from "@/features/clients/fake-clients";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { clientsColumns } from "../clients-columns";

export function ClientsResponsive() {
  return <DataTable data={FAKE_CLIENTS} columns={clientsColumns} emptyMessage="Пользователи не найдены" />;
}
