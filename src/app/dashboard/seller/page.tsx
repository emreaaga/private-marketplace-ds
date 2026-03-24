import { redirect } from "next/navigation";

export default function SellerPage() {
  redirect("/dashboard/seller/orders");
}
