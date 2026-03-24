import { FlightShipmentsTable } from "@/widgets/flights-table";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const flightId = Number(id);

  if (!Number.isFinite(flightId)) {
    return <div className="text-muted-foreground p-6">Некорректный ID рейса: {String(id)}</div>;
  }

  return (
    <div className="space-y-4">
      <FlightShipmentsTable flightId={flightId} />
    </div>
  );
}
