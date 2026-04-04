import { getDirectoryData } from "@/entities/dashboard/api/get-directory.api.server";

import { DirectoryClient } from "./_components/directory-client";

export default async function DirectoryPage() {
  const data = await getDirectoryData();

  return (
    <div className="space-y-4">
      <DirectoryClient initialData={data} />
    </div>
  );
}
