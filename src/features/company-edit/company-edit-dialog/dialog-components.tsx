import { Building2, ClipboardList, Loader2, Users } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

const tabTriggerClasses = cn(
  "relative flex items-center gap-2 rounded-md px-3 py-1 text-[13px] font-medium transition-all",
  "text-muted-foreground hover:bg-background/50 hover:text-foreground",
  "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
);

export function CompanyDialogHeader() {
  return (
    <DialogHeader className="flex flex-row items-center justify-center border-b px-4 py-2">
      <DialogTitle className="sr-only">Редактирование компании</DialogTitle>
      <DialogDescription className="sr-only">Управление данными фирмы, сотрудниками и услугами</DialogDescription>

      <TabsList className="bg-muted/50 inline-flex h-8 items-center gap-1 rounded-lg border-none p-1">
        <TabsTrigger value="company" className={tabTriggerClasses}>
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <span>Фирма</span>
        </TabsTrigger>
        <TabsTrigger value="employees" className={tabTriggerClasses}>
          <Users className="h-3.5 w-3.5 shrink-0" />
          <span>Сотрудники</span>
        </TabsTrigger>
        <TabsTrigger value="services" className={tabTriggerClasses}>
          <ClipboardList className="h-3.5 w-3.5 shrink-0" />
          <span>Услуги</span>
        </TabsTrigger>
      </TabsList>
    </DialogHeader>
  );
}

type FooterProps = {
  companyId: number | null;
  pending: boolean;
  isSaveDisabled: boolean;
  onRequestClose: () => void;
};

export function CompanyDialogFooter({ companyId, pending, isSaveDisabled, onRequestClose }: FooterProps) {
  return (
    <DialogFooter className="bg-muted/5 flex items-center justify-between border-t px-4 py-2.5 sm:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground/50 text-[11px] font-bold tracking-tight uppercase">
          Фирма: {companyId}
        </span>
        {pending && <Loader2 className="text-muted-foreground h-3 w-3 animate-spin" />}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onRequestClose} disabled={pending}>
          Отмена
        </Button>
        <Button type="submit" form="company-edit-form" size="sm" disabled={isSaveDisabled}>
          {pending ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </DialogFooter>
  );
}
