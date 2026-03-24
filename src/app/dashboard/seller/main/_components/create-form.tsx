"use client";

import type { UseFormReturn } from "react-hook-form";

import { PhotoField } from "./create-form/photo-field";
import { ProductFormFooter } from "./create-form/product-form-footer";
import { ProductMainSection } from "./create-form/product-main-section";
import { ProductMetaSection } from "./create-form/product-meta-section";
import { ProductResultSection } from "./create-form/product-result-section";
import { ProductFormValues } from "./types/product-form.types";

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
