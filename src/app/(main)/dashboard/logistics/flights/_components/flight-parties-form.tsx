type Party = {
  id: string;
  fromCountry: string; // TR
  fromCity: string; // IST
  departureAt: string; // 10.01.2026 12:30
  arrivalAt: string; // 10.01.2026 18:40
  toCountry: string; // UZ
  toCity: string; // TAS
};

const MOCK_PARTIES: Party[] = [
  {
    id: "1",
    fromCountry: "TR",
    fromCity: "IST",
    departureAt: "10.01.2026 12:30",
    arrivalAt: "10.01.2026 18:40",
    toCountry: "UZ",
    toCity: "TAS",
  },
  {
    id: "2",
    fromCountry: "UZ",
    fromCity: "TAS",
    departureAt: "12.01.2026 09:10",
    arrivalAt: "12.01.2026 13:50",
    toCountry: "TR",
    toCity: "IST",
  },
  {
    id: "3",
    fromCountry: "UZ",
    fromCity: "TAS",
    departureAt: "12.01.2026 09:10",
    arrivalAt: "12.01.2026 13:50",
    toCountry: "TR",
    toCity: "IST",
  },
  {
    id: "4",
    fromCountry: "UZ",
    fromCity: "TAS",
    departureAt: "12.01.2026 09:10",
    arrivalAt: "12.01.2026 13:50",
    toCountry: "TR",
    toCity: "IST",
  },
  {
    id: "5",
    fromCountry: "UZ",
    fromCity: "TAS",
    departureAt: "12.01.2026 09:10",
    arrivalAt: "12.01.2026 13:50",
    toCountry: "TR",
    toCity: "IST",
  },
];

export function FlightPartiesForm() {
  return (
    <div className="divide-y rounded-md border text-xs">
      {MOCK_PARTIES.map((p) => (
        <div key={p.id} className="flex items-center gap-2 px-3 py-2">
          <span className="font-medium">
            {p.fromCountry}-{p.fromCity}
          </span>

          <span className="text-muted-foreground font-mono">
            {p.departureAt} – {p.arrivalAt}
          </span>

          <span className="text-muted-foreground">→</span>

          <span className="font-medium">
            {p.toCountry}-{p.toCity}
          </span>
        </div>
      ))}
    </div>
  );
}
