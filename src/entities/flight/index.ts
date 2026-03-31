// MODEL
export * from "./model/flight-create.schema";
export * from "./model/flight-update.schema";
export * from "./model/flight.dto";
export { type Flight } from "./model/flight.model";
export { type FlightStatuses } from "./model/flight.status";
export { FLIGHT_STATUS_META } from "./model/flight.status.meta";

// TYPES
export type {
  FlightCityDistribution,
  FlightDistributionRes,
  FlightDistributionSummary,
} from "./api/types/flight-distribution.res";

// API
export { createFlightApi } from "./api/create-flight.api";
export * from "./api/get-flight-detail.api";
export * from "./api/get-flight-summary.api";
export * from "./api/get-flights.api";
export * from "./api/update-flight.api";

// API TYPES
export { type CreateFlightPayload } from "./api/types/create-flight.pay";
export { type DetailFlightRequest } from "./api/types/detail-flight.req";
export { type UpdateFlightRequest } from "./api/types/update-flight.pay";

// QUERIES
export * from "./queries/flights-keys";
export { useConfirmArrival } from "./queries/use-confirm-arrival";
export * from "./queries/use-create-flight";
export * from "./queries/use-flight-details";
export { useFlightDistribution } from "./queries/use-flight-distribution";
export * from "./queries/use-flight-summary";
export * from "./queries/use-flight-update";
export * from "./queries/use-flights-list";

// UI
export { ConfirmArrivalDialog } from "./ui/confirm-arrival-dialog";
export { DemoRouteBuilder } from "./ui/demo-route-builder";
export { DomesticFlightGeneralForm } from "./ui/domestic-general-form";
export { FlightSelect } from "./ui/flight-select";
export { FlightAndTripTimeline } from "./ui/flight-status-timeline";
