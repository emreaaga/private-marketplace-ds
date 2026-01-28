import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import type { ServicePrice } from "@/shared/types/services/services.pricing";
import { SERVICE_PRICING_META } from "@/shared/types/services/services.pricing.meta";
import type { ServiceType } from "@/shared/types/services/services.types";
import { SERVICE_TYPE_META } from "@/shared/types/services/services.types.meta";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/shared/ui/atoms/input-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

import type { CreateServiceForm } from "./use-create-service-form";

type Props = {
  form: CreateServiceForm;
  setForm: (form: CreateServiceForm) => void;
  errors: Partial<Record<keyof CreateServiceForm, true>>;
  clearError: (field: keyof CreateServiceForm) => void;
};

export function CreateServiceForm({ form, setForm, errors, clearError }: Props) {
  return (
    <div className="space-y-2">
      <CompanySelect
        value={form.company_id}
        error={!!errors.company_id}
        onChange={(company_id) => {
          setForm({ ...form, company_id });
          clearError("company_id");
        }}
      />

      <Select
        value={form.type}
        onValueChange={(value) => {
          setForm({ ...form, type: value as ServiceType });
          clearError("type");
        }}
      >
        <SelectTrigger className={`w-full ${errors.type ? "border-destructive focus:ring-destructive" : ""}`}>
          <SelectValue placeholder="Тип услуги" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SERVICE_TYPE_META).map(([key, { label, Icon }]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2">
                <Icon className="text-muted-foreground h-4 w-4" />
                {label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={form.pricing_type}
        onValueChange={(value) => {
          setForm({ ...form, pricing_type: value as ServicePrice });
          clearError("pricing_type");
        }}
      >
        <SelectTrigger className={`w-full ${errors.pricing_type ? "border-destructive focus:ring-destructive" : ""}`}>
          <SelectValue placeholder="Тариф" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SERVICE_PRICING_META).map(([key, { label, Icon }]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2">
                <Icon className="text-muted-foreground h-4 w-4" />
                {label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <InputGroup className={errors.price ? "border-destructive rounded-md border" : ""}>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>

        <InputGroupInput
          type="number"
          step="0.01"
          inputMode="decimal"
          placeholder="0.00"
          value={form.price}
          onChange={(e) => {
            setForm({ ...form, price: e.target.value });
            clearError("price");
          }}
          className={errors.price ? "focus:ring-destructive" : ""}
        />

        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
