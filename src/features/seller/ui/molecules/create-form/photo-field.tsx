"use client";

import Image from "next/image";

import { X, Upload } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { FormControl, FormItem } from "@/shared/ui/atoms/form";
import { Input } from "@/shared/ui/atoms/input";

interface PhotoFieldProps {
  preview: string | null;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
}

export function PhotoField({ preview, onPhotoUpload, onRemovePhoto }: PhotoFieldProps) {
  return (
    <FormItem>
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
          <label className="border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 transition">
            <Upload className="text-muted-foreground h-6 w-6" />
            <div className="text-center">
              <p className="text-xs font-medium">Нажмите для загрузки фото</p>
            </div>
            <Input type="file" accept="image/*" className="hidden" onChange={onPhotoUpload} />
          </label>
        )}
      </FormControl>
    </FormItem>
  );
}
