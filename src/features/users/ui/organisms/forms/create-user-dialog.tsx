"use client";

import type { ReactNode } from "react";
// eslint-disable-next-line no-duplicate-imports
import { useState } from "react";

import { Phone, Shield, Store, User } from "lucide-react";
import { toast } from "sonner";

import { locationData } from "@/features/users/fake-user";
import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/shared/ui/atoms/dialog";
import { Field } from "@/shared/ui/atoms/field";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";
import { Textarea } from "@/shared/ui/atoms/textarea";

export function CreateUserDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  const selectedCountryData = country ? locationData[country] : null;
  const selectedCityData = country && city ? locationData[country].cities[city] : null;
  const phoneCode = selectedCountryData?.phoneCode ?? "+";

  const handleSubmit = () => {
    toast.success("Пользователь создан");

    setOpen(false);
    setCountry("");
    setCity("");
    setDistrict("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setCountry("");
      setCity("");
      setDistrict("");
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setCity("");
    setDistrict("");
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="flex max-h-[85vh] w-full flex-col overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>Новый пользователь</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            <Field>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Активен</SelectItem>
                  <SelectItem value="inactive">Неактивен</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="text-muted-foreground h-4 w-4" />
                      <span>Админ</span>
                    </div>
                  </SelectItem>

                  <SelectItem value="seller">
                    <div className="flex items-center gap-2">
                      <Store className="text-muted-foreground h-4 w-4" />
                      <span>Продавец</span>
                    </div>
                  </SelectItem>

                  <SelectItem value="customer">
                    <div className="flex items-center gap-2">
                      <User className="text-muted-foreground h-4 w-4" />
                      <span>Клиент</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Input id="firstName" placeholder="Имя" />
            </Field>

            <Field>
              <Input id="lastName" placeholder="Фамилия" />
            </Field>

            <Field>
              <Select value={country} onValueChange={handleCountryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Страна" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(locationData).map(([key, data]) => (
                    <SelectItem key={key} value={key}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Select value={city} onValueChange={handleCityChange} disabled={!country}>
                <SelectTrigger>
                  <SelectValue placeholder="Город" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCountryData &&
                    Object.entries(selectedCountryData.cities).map(([key, cityData]) => (
                      <SelectItem key={key} value={key}>
                        {cityData.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Select value={district} onValueChange={setDistrict} disabled={!city}>
                <SelectTrigger>
                  <SelectValue placeholder="Район" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCityData?.districts.map((dist) => (
                    <SelectItem key={dist} value={dist}>
                      {dist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Textarea id="address" placeholder="Улица, дом, квартира" />
            </Field>
            <Field>
              <div className="relative">
                <span className="text-muted-foreground absolute top-1/2 left-3 flex w-8 -translate-y-1/2 items-center justify-center text-sm">
                  {country ? phoneCode : <Phone className="h-4 w-4 opacity-60" />}
                </span>

                <Input placeholder="Номер телефона" disabled={!country} className="pl-14" />
              </div>
            </Field>
          </div>
        </div>

        <DialogFooter className="border-t px-2 py-2">
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              Отмена
            </Button>
          </DialogClose>
          <Button size="sm" onClick={handleSubmit}>
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
