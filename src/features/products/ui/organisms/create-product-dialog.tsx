"use client";

import { useState } from "react";

import Image from "next/image";

import { Upload, X } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/atoms/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/atoms/drawer";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/ui/atoms/form";
import { Input } from "@/shared/ui/atoms/input";
import { Switch } from "@/shared/ui/atoms/switch";
import { Textarea } from "@/shared/ui/atoms/textarea";

const defaultForm = {
  name: "",
  category: "",
  unit: "",
  quantity: "",
  price: "",
  comment: "",
  is_public: false,
  photo_url: "",
};

type FormValues = typeof defaultForm;

function ProductFormContent({
  form,
  preview,
  isDesktop,
  onPhotoUpload,
  onRemovePhoto,
  onCancel,
}: {
  form: UseFormReturn<FormValues>;
  preview: string | null;
  isDesktop: boolean;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <FormItem>
        <FormLabel>Фото товара</FormLabel>
        <FormControl>
          {preview ? (
            <div className="relative">
              <Image src={preview} alt="Preview" width={200} height={200} className="mx-auto rounded-lg object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={onRemovePhoto}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition">
              <Upload className="text-muted-foreground h-8 w-8" />
              <div className="text-center">
                <p className="text-sm font-medium">Нажмите для загрузки</p>
                <p className="text-muted-foreground text-xs">PNG, JPG до 5MB</p>
              </div>
              <Input type="file" accept="image/*" className="hidden" onChange={onPhotoUpload} />
            </label>
          )}
        </FormControl>
      </FormItem>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название *</FormLabel>
              <FormControl>
                <Input placeholder="Фисташки премиум" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категория</FormLabel>
              <FormControl>
                <Input placeholder="Орехи" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ед. изм.</FormLabel>
              <FormControl>
                <Input placeholder="кг" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Количество</FormLabel>
              <FormControl>
                <Input type="number" placeholder="500" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input type="number" placeholder="125000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="comment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Комментарий</FormLabel>
            <FormControl>
              <Textarea placeholder="Высокое качество, крупные ядра..." className="min-h-20 resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="is_public"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Публичный товар</FormLabel>
              <p className="text-muted-foreground text-sm">Товар будет виден всем пользователям</p>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {isDesktop ? (
        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit">Создать</Button>
        </DialogFooter>
      ) : (
        <DrawerFooter className="px-0">
          <Button type="submit">Создать</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
        </DrawerFooter>
      )}
    </>
  );
}

export function CreateProductDialog({
  onCreate,
  buttonClassName,
}: {
  onCreate: (data: FormValues) => void;
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useForm({
    defaultValues: defaultForm,
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

  const handleSave = (values: FormValues) => {
    onCreate(values);
    setOpen(false);
    form.reset(defaultForm);
    setPreview(null);
    toast.success("Продукт успешно создан!");
  };

  const handleCancel = () => {
    setOpen(false);
    form.reset(defaultForm);
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
                isDesktop={isDesktop}
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
                isDesktop={isDesktop}
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
