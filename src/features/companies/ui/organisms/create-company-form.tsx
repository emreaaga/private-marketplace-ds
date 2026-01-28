import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { CompanyType } from "@/shared/types/company/company.types";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

import type { CreateCompanyForm } from "./use-create-company-form";

type Props = {
  form: CreateCompanyForm;
  setForm: (form: CreateCompanyForm) => void;
  errors: Partial<Record<keyof CreateCompanyForm, true>>;
  clearError: (field: keyof CreateCompanyForm) => void;
};

export function CreateCompanyForm({ form, setForm, errors, clearError }: Props) {
  return (
    <div className="space-y-2">
      <Select
        value={form.type}
        onValueChange={(v) => {
          setForm({ ...form, type: v as CompanyType });
          clearError("type");
        }}
      >
        <SelectTrigger className={`w-full ${errors.type ? "border-destructive focus:ring-destructive" : ""}`}>
          <SelectValue placeholder="Тип фирмы" />
        </SelectTrigger>

        <SelectContent>
          {Object.entries(COMPANY_TYPE_META).map(([type, meta]) => {
            const Icon = meta.Icon;
            return (
              <SelectItem key={type} value={type}>
                <div className="flex items-center gap-2">
                  <Icon className="text-muted-foreground h-4 w-4" />
                  {meta.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <div className={errors.country || errors.city ? "border-destructive rounded-md border" : ""}>
        <CountryCityPopoverSelect
          value={{ country: form.country, city: form.city }}
          onChange={({ country, city }) => {
            setForm({ ...form, country, city });
            clearError("country");
            clearError("city");
          }}
        />
      </div>

      <Input
        placeholder="Название фирмы"
        value={form.name}
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
          clearError("name");
        }}
        className={errors.name ? "border-destructive focus:ring-destructive" : ""}
      />
    </div>
  );
}
