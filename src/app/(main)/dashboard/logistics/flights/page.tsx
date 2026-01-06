import { FlightBoard } from "./_components/flight-board";
import { MOCK_FLIGHTS } from "./_components/mock-flights";

export default function ShipmentPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">Расписание авиапочты</h1>

      <FlightBoard flights={MOCK_FLIGHTS} />
    </div>
  );
}
