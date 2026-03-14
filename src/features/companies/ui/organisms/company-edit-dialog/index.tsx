"use client";

import { Loader2 } from "lucide-react";

import type { UpdateCompanyPayload } from "@/features/companies/api/companies";
import { useCompanyDetail } from "@/features/companies/queries/use-company-detail";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent } from "@/shared/ui/atoms/dialog";
import { Tabs, TabsContent } from "@/shared/ui/atoms/tabs";

import { CompanyEditForm } from "./company-edit-form";
import { CompanyEmployeesList } from "./company-employees-list";
import { CompanyDialogFooter, CompanyDialogHeader } from "./dialog-components";
import { useCompanyForm } from "./use-company-form";

type Props = {
  open: boolean;
  companyId: number | null;
  pending?: boolean;
  onOpenChangeAction(open: boolean): void;
  onSubmitAction?: (companyId: number, values: UpdateCompanyPayload) => void | Promise<unknown>;
};

export function CompanyEditDialog({ open, companyId, pending = false, onOpenChangeAction, onSubmitAction }: Props) {
  const isEnabled = open && companyId != null;
  const { data, isLoading, isError } = useCompanyDetail(companyId, isEnabled);

  const company = data?.data;
  const employees = data?.employees || [];
  const totalEmployees = data?.totalEmployees || 0;

  const { form, submit, requestClose, isSaveDisabled } = useCompanyForm({
    open,
    companyId,
    companyData: company,
    pending,
    isLoading,
    onOpenChangeAction,
    onSubmitAction,
  });

  return (
    <Dialog open={open} onOpenChange={requestClose}>
      <DialogContent
        className={cn(
          "border-muted/40 flex flex-col overflow-hidden rounded-xl p-0 font-sans shadow-2xl transition-all",
          "h-130 w-full sm:max-w-137.5",
        )}
      >
        <Tabs defaultValue="company" className="flex flex-1 flex-col overflow-hidden">
          <CompanyDialogHeader />

          <div className="bg-card/30 flex-1 overflow-y-auto">
            <TabsContent value="company" className="m-0 h-full border-none outline-none">
              {isError && (
                <div className="text-destructive py-10 text-center text-sm font-medium">Ошибка загрузки данных</div>
              )}
              {!isError && (
                <div className="p-4">
                  <CompanyEditForm form={form} isLoading={isLoading} pending={pending} onSubmit={submit} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="employees" className="m-0 h-full border-none p-4 outline-none">
              {isLoading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2 className="text-muted-foreground/30 h-5 w-5 animate-spin" />
                </div>
              ) : (
                <CompanyEmployeesList employees={employees} total={totalEmployees} />
              )}
            </TabsContent>

            <TabsContent value="services" className="m-0 h-full border-none p-4 outline-none">
              <p className="text-muted-foreground mt-10 text-center text-sm">Список услуг в разработке</p>
            </TabsContent>
          </div>
        </Tabs>

        <CompanyDialogFooter
          companyId={companyId}
          pending={pending}
          isSaveDisabled={isSaveDisabled}
          onRequestClose={requestClose}
        />
      </DialogContent>
    </Dialog>
  );
}
