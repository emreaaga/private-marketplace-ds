import { ShipmentsServerService } from "@/features/shipments/api/shipments.server";

import { FlightShipmentsTable } from "../../../_components/flight-shipments-table.client";

export default async function FlightShipmentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const flightId = Number(id);

  if (!Number.isFinite(flightId)) {
    return <div className="text-muted-foreground p-6">Некорректный ID рейса</div>;
  }

  const shipments = await ShipmentsServerService.getShipments({
    flight_id: flightId,
  });

  return (
    <div className="space-y-4">
      <FlightShipmentsTable data={shipments} />
    </div>
  );
}
