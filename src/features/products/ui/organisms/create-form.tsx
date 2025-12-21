"use client";

import type { UseFormReturn } from "react-hook-form";

import { ProductFormValues } from "@/features/products/types/product-form.types";
import { PhotoField } from "@/features/products/ui/molecules/create-form/photo-field";
import { ProductFormFooter } from "@/features/products/ui/organisms/create-form/product-form-footer";
import { ProductMainSection } from "@/features/products/ui/organisms/create-form/product-main-section";
import { ProductMetaSection } from "@/features/products/ui/organisms/create-form/product-meta-section";

import { ProductResultSection } from "./create-form/product-result-section";

interface ProductFormContentProps {
  form: UseFormReturn<ProductFormValues>;
  preview: string | null;
  isDesktop: boolean;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
  onCancel: () => void;
}

export function ProductFormContent({
  form,
  preview,
  isDesktop,
  onPhotoUpload,
  onRemovePhoto,
  onCancel,
}: ProductFormContentProps) {
  return (
    <>
      <PhotoField preview={preview} onPhotoUpload={onPhotoUpload} onRemovePhoto={onRemovePhoto} />
      <ProductMainSection form={form} />
      <ProductMetaSection form={form} />
      <ProductResultSection form={form} />
      <ProductFormFooter isDesktop={isDesktop} onCancel={onCancel} />
    </>
  );
}
