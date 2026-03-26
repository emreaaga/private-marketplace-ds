"use client";

import { BranchSummary } from "@/entities/branch";

import { useFlightShipments } from "../lib/use-flight-shipments";

import { FlightShipmentsTable } from "./flight-shipments-table";

interface EditFlightShipmentsProps {
  branches: BranchSummary[];
}

export function EditFlightShipments({ branches }: EditFlightShipmentsProps) {
  const shipmentsLogic = useFlightShipments();

  return <FlightShipmentsTable {...shipmentsLogic} branches={branches} />;
}
