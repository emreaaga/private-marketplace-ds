import { ClientsToolbar } from "@/features/clients/ui/organisms/sections/clients-toolbar";
import { ClientsUsersSection } from "@/features/clients/ui/organisms/sections/clients-users-section";

export default function ClientsMainPage() {
  return (
    <div className="space-y-4">
      <ClientsToolbar />
      <ClientsUsersSection />
    </div>
  );
}
