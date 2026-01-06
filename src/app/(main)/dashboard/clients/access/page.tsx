import { AccessSettingsCard } from "@/features/clients/ui/organisms/access-settings-card";
import { StoreLinkCard } from "@/features/clients/ui/organisms/store-link-card";

export default function ClientsAccessPage() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <StoreLinkCard />
        <AccessSettingsCard />
      </div>
    </div>
  );
}
