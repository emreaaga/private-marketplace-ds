import { FlightCard } from "./flight-card";
import { Flight } from "./types";

interface Props {
  flights: Flight[];
}

export function FlightBoard({ flights }: Props) {
  if (!flights.length) {
    return <p className="text-muted-foreground text-sm">Рейсы не запланированы</p>;
  }

  const sorted = [...flights].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const [next, ...rest] = sorted;

  return (
    <div className="space-y-4">
      <section className="space-y-2">
        <h2 className="text-muted-foreground text-sm font-medium">Ближайший рейс</h2>

        <FlightCard flight={next} highlighted />
      </section>

      {rest.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">Следующие рейсы</h3>

          <div className="space-y-2">
            {rest.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
