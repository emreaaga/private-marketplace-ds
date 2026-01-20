"use client";

import { useState } from "react";

import { toast } from "sonner";

import { companiesService } from "@/features/companies/api/companies";
import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import { CompanyType } from "@/shared/types/company/company.types";
import { COUNTRY_META } from "@/shared/types/company/country.meta";
import { CountryCode } from "@/shared/types/company/country.types";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/shared/ui/atoms/dialog";
import { Field } from "@/shared/ui/atoms/field";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

type CompanyStatus = "active" | "inactive";

type CreateCompanyForm = {
  name: string;
  type: CompanyType | "";
  country: CountryCode | "";
  status: CompanyStatus;
};

const initialForm: CreateCompanyForm = {
  name: "",
  type: "",
  country: "",
  status: "active",
};

type CreateCompanyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateCompanyDialog({ open, onOpenChange }: CreateCompanyDialogProps) {
  const [form, setForm] = useState<CreateCompanyForm>(initialForm);
  const [loading, setLoading] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setForm(initialForm);
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.type || !form.country) return;

    try {
      setLoading(true);

      await companiesService.createCompany({
        name: form.name,
        type: form.type,
        country: form.country,
        is_active: form.status === "active",
      });

      toast.success("Фирма создана");

      setForm(initialForm);
      onOpenChange(false);
    } catch {
      toast.error("Не удалось создать фирму");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[85vh] w-full flex-col overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>Создание фирмы</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            <Field>
              <Input
                placeholder="Название фирмы"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </Field>

            <Field>
              <Select value={form.status} onValueChange={(v) => setForm((p) => ({ ...p, status: v as CompanyStatus }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span>Активна</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-yellow-400" />
                      <span>Неактивна</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Select value={form.type} onValueChange={(v) => setForm((p) => ({ ...p, type: v as CompanyType }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Тип фирмы" />
                </SelectTrigger>

                <SelectContent>
                  {Object.entries(COMPANY_TYPE_META).map(([type, meta]) => {
                    const Icon = meta.Icon;

                    return (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center gap-2">
                          <Icon className="text-muted-foreground h-4 w-4" />
                          <span>{meta.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Select value={form.country} onValueChange={(v) => setForm((p) => ({ ...p, country: v as CountryCode }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Страна" />
                </SelectTrigger>

                <SelectContent>
                  {Object.entries(COUNTRY_META).map(([code, meta]) => (
                    <SelectItem key={code} value={code}>
                      <span>{meta.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>

        <DialogFooter className="border-t px-2 py-2">
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              Отмена
            </Button>
          </DialogClose>

          <Button size="sm" onClick={handleSubmit} disabled={!form.name || !form.type || !form.country || loading}>
            {loading ? "Создание..." : "Создать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
