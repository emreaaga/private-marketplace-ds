"use client";

import { useMemo, useState } from "react";

import { Building2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { useCompaniesLookup } from "@/entities/company";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/atoms/popover";

import { useBranchesLookup } from "../queries/use-branches-lookup";

interface CompanyBranchValue {
  companyId: number | null;
  branchId: number | null;
}

interface Props {
  value: CompanyBranchValue;
  onChangeAction: (val: CompanyBranchValue) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CompanyBranchPopoverSelect({
  value,
  onChangeAction,
  placeholder = "Выберите фирму",
  className,
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"company" | "branch">("company");

  const { data: companies = [], isLoading: isCompaniesLoading } = useCompaniesLookup({
    enabled: open,
  });

  const { data: branches = [], isLoading: isBranchesLoading } = useBranchesLookup({
    companyId: value.companyId,
    enabled: open && step === "branch" && !!value.companyId,
  });

  const selectedCompany = useMemo(() => companies.find((c) => c.id === value.companyId), [companies, value.companyId]);
  const selectedBranch = useMemo(() => branches.find((b) => b.id === value.branchId), [branches, value.branchId]);

  const handleCompanySelect = (companyId: number) => {
    onChangeAction({ companyId, branchId: null });
    setStep("branch");
  };

  const handleBranchSelect = (branchId: number) => {
    onChangeAction({ ...value, branchId });
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next && !value.companyId) setStep("company");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "h-9 w-full justify-between gap-2 px-2.5 text-[13px] font-normal transition-all",
            "border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:bg-zinc-50",
            "dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900",
            className,
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {selectedCompany ? (
              <div className="flex items-center gap-1.5 truncate text-zinc-900 dark:text-zinc-100">
                <Building2 className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                <span className="truncate font-medium">{selectedCompany.name}</span>
                {selectedBranch && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">/</span>
                    <span className="truncate text-zinc-500">{selectedBranch.name}</span>
                  </>
                )}
              </div>
            ) : (
              <span className="text-zinc-400">{placeholder}</span>
            )}
          </div>
          <ChevronRight
            className={cn("h-3.5 w-3.5 text-zinc-400 transition-transform duration-200", open && "rotate-90")}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) overflow-hidden rounded-lg border-zinc-200 p-0 shadow-xl dark:border-zinc-800"
        align="start"
        sideOffset={6}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
          <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
            {step === "company" ? "Компании" : "Филиалы"}
          </span>
          {step === "branch" && (
            <button
              onClick={() => setStep("company")}
              className="rounded text-zinc-500 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        <div
          onWheel={(e) => e.stopPropagation()}
          className={cn("custom-scrollbar max-h-70 overflow-x-hidden overflow-y-auto p-1", "touch-pan-y")}
        >
          {step === "company" && (
            <div className="grid gap-0.5">
              {isCompaniesLoading ? (
                <div className="flex flex-col items-center justify-center gap-2 py-10">
                  <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
                </div>
              ) : (
                companies.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => handleCompanySelect(company.id)}
                    className="group flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[12px] transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="font-mono text-[10px] font-medium tracking-tighter text-zinc-400">
                        {String(company.id).padStart(3, "0")}
                      </span>
                      <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                      <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">{company.name}</span>
                    </div>
                    <ChevronRight className="h-3 w-3 transform text-zinc-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </button>
                ))
              )}
            </div>
          )}

          {step === "branch" && (
            <div className="grid gap-0.5">
              {isBranchesLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
                </div>
              ) : (
                branches.map((branch) => (
                  <button
                    key={branch.id}
                    onClick={() => handleBranchSelect(branch.id)}
                    className="group flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[12px] transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="min-w-8 font-mono text-[10px] font-medium tracking-tighter text-zinc-400 uppercase">
                        {branch.route || "—"}
                      </span>
                      <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-700" />
                      <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">{branch.name}</span>
                    </div>
                    <ChevronRight className="h-3 w-3 transform text-zinc-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
