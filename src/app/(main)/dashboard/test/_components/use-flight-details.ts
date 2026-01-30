"use client";

import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import { flightsService } from "@/features/flights/api/flights";
import type { FlightDetails } from "@/shared/types/flight/flight.dto";

type UseFlightDetailsResult = {
  loading: boolean;
  flight: FlightDetails | null;
  refresh: () => void;
};

export function useFlightDetails(open: boolean, flightId: number | null): UseFlightDetailsResult {
  const cacheRef = useRef<Map<number, FlightDetails>>(new Map());

  const [loading, setLoading] = useState(false);
  const [flight, setFlight] = useState<FlightDetails | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!open || flightId == null) return;

    const cached = cacheRef.current.get(flightId);
    if (cached && nonce === 0) {
      setFlight(cached);
      return;
    }

    let cancelled = false;
    setLoading(true);

    flightsService
      .getFlight(flightId)
      .then((data) => {
        if (cancelled) return;
        cacheRef.current.set(flightId, data);
        setFlight(data);
      })
      .catch(() => {
        if (cancelled) return;
        setFlight(null);
        toast.error("Не удалось загрузить рейс");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, flightId, nonce]);

  return {
    loading,
    flight,
    refresh: () => setNonce((x) => x + 1),
  };
}
