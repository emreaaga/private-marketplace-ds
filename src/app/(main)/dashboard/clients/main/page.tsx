import { ClientsResponsive } from "@/features/clients/ui/organisms/sections/clients-responsive";
import { ClientsToolbar } from "@/features/clients/ui/organisms/sections/clients-toolbar";

export default function ClientsMainPage() {
  return (
    <div className="space-y-4">
      <ClientsToolbar />
      <ClientsResponsive />
    </div>
  );
}
