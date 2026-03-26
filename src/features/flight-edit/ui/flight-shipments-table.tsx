import { BranchSummary } from "@/entities/branch";
import { AddingShipmentRow, SelectedShipmentRow } from "@/entities/shipment";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

import type { UseFlightShipmentsReturn } from "../lib/use-flight-shipments";

import { BranchSummaryRow } from "./branch-summary-row";
import { EmptyShipmentsState } from "./empty-shipments-state";
import { FlightShipmentsFooter } from "./flight-shipments-footer";
import { FlightShipmentsHeader } from "./flight-shipments-header";

interface FlightShipmentsTableProps extends UseFlightShipmentsReturn {
  branches: BranchSummary[];
}

export function FlightShipmentsTable({
  fields,
  addingRows,
  selectedIds,
  totals,
  weightDiffs,
  addNewRow,
  removeAddingRow,
  addShipment,
  removeShipment,
  branches,
}: FlightShipmentsTableProps) {
  const isEmpty = fields.length === 0 && addingRows.length === 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200/60 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <FlightShipmentsHeader onAdd={addNewRow} />

      <div className="flex min-h-0 flex-1 flex-col bg-white">
        <div className="flex min-h-0 flex-[1.5] flex-col">
          <ScrollArea className="h-full">
            <div className="flex flex-col divide-y divide-zinc-100">
              {fields.map((field, index) => (
                <div key={field.rhf_id} className="group transition-colors hover:bg-zinc-50/50">
                  <SelectedShipmentRow
                    index={index}
                    internalNumber={field.internal_number}
                    meta={{
                      name: field.company_name,
                      ordersCount: field.orders_count,
                      weight: field.total_weight_kg,
                      weightDiff: weightDiffs[field.id] ?? 0,
                      prepaid: field.total_prepaid,
                      remaining: field.total_remaining,
                    }}
                    onRemoveAction={() => removeShipment(field.id, index)}
                  />
                </div>
              ))}

              {addingRows.map((rowId) => (
                <AddingShipmentRow
                  key={rowId}
                  onCancelAction={() => removeAddingRow(rowId)}
                  onSelectAction={(shipmentId, meta) => addShipment(shipmentId, meta, rowId)}
                  excludeIds={selectedIds}
                />
              ))}

              {isEmpty && <EmptyShipmentsState onClick={addNewRow} />}
            </div>
          </ScrollArea>
        </div>

        <div className="flex items-center justify-center gap-2 border-y border-zinc-200/60 bg-zinc-50/50 px-4 py-0.5 shadow-[0_-1px_2px_rgba(0,0,0,0.02)]">
          <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
            Распределение по филиалам
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col bg-zinc-50/20">
          <ScrollArea className="h-full">
            <div className="flex flex-col divide-y divide-zinc-100">
              {branches?.map((branch, idx) => (
                <BranchSummaryRow key={branch.branch_id || idx} index={idx} branch={branch} />
              ))}
              {(!branches || branches.length === 0) && (
                <div className="p-4 text-center text-xs text-zinc-400">Нет данных по филиалам</div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      <FlightShipmentsFooter totals={totals} />
    </div>
  );
}
