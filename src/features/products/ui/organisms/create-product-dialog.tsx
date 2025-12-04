"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  ProductFormContent,
  productFormDefaultValues,
  type ProductFormValues,
} from "@/features/products/ui/molecules/product-form-content";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/atoms/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/atoms/drawer";
import { Form } from "@/shared/ui/atoms/form";

interface CreateProductDialogProps {
  onCreate: (data: ProductFormValues) => void;
  buttonClassName?: string;
}

export function CreateProductDialog({ onCreate, buttonClassName }: CreateProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useForm<ProductFormValues>({
    defaultValues: productFormDefaultValues,
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Файл слишком большой. Максимум 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Можно загружать только изображения");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    form.setValue("photo_url", url);
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    form.setValue("photo_url", "");
  };

  const handleSave = (values: ProductFormValues) => {
    onCreate(values);
    setOpen(false);
    form.reset(productFormDefaultValues);
    setPreview(null);
    toast.success("Продукт успешно создан!");
  };

  const handleCancel = () => {
    setOpen(false);
    form.reset(productFormDefaultValues);
    setPreview(null);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={buttonClassName}>Создать продукт</Button>
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Создать продукт</DialogTitle>
            <DialogDescription>Добавьте оптовый товар в каталог</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
              <ProductFormContent
                form={form}
                preview={preview}
                isDesktop={true}
                onPhotoUpload={handlePhotoUpload}
                onRemovePhoto={handleRemovePhoto}
                onCancel={handleCancel}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className={buttonClassName}>Создать продукт</Button>
      </DrawerTrigger>

      <DrawerContent className="max-h-[90vh]">
        <div className="overflow-y-auto px-4">
          <DrawerHeader>
            <DrawerTitle>Создать продукт</DrawerTitle>
            <DrawerDescription>Добавьте оптовый товар в каталог</DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
              <ProductFormContent
                form={form}
                preview={preview}
                isDesktop={false}
                onPhotoUpload={handlePhotoUpload}
                onRemovePhoto={handleRemovePhoto}
                onCancel={handleCancel}
              />
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
