import { OrderCreateForm } from "./oder-create.form";

export const emptyOrderCreateForm = (): OrderCreateForm => ({
  box_size: "",
  weight_kg: "",
  rate_per_kg: "",
  extra_fee: "",
  prepaid_amount: "",
});
