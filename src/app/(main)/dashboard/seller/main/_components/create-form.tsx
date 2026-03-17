"use client";

import type { UseFormReturn } from "react-hook-form";

import { PhotoField } from "@/app/(main)/dashboard/seller/main/_components/create-form/photo-field";
import { ProductFormFooter } from "@/app/(main)/dashboard/seller/main/_components/create-form/product-form-footer";
import { ProductFormValues } from "@/app/(main)/dashboard/seller/main/_components/types/product-form.types";

import { ProductMainSection } from "./create-form/product-main-section";
import { ProductMetaSection } from "./create-form/product-meta-section";
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
