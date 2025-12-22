"use client";

import { useState, useCallback, useMemo } from "react";

import { Phone, Shield, Store, User } from "lucide-react";

import { locationData } from "@/features/users/fake-user";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/shared/ui/atoms/dialog";
import { Field } from "@/shared/ui/atoms/field";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";
import { Textarea } from "@/shared/ui/atoms/textarea";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  const selectedCountryData = useMemo(() => (country ? locationData[country] : null), [country]);

  const selectedCityData = useMemo(
    () => (country && city ? locationData[country]?.cities[city] : null),
    [country, city],
  );

  const phoneCode = selectedCountryData?.phoneCode ?? "+";

  const handleSubmit = useCallback(async () => {
    const { toast } = await import("sonner");
    toast.success("Пользователь создан");

    onOpenChange(false);

    // Сброс формы после закрытия
    setTimeout(() => {
      setCountry("");
      setCity("");
      setDistrict("");
    }, 200);
  }, [onOpenChange]);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      onOpenChange(newOpen);
      if (!newOpen) {
        setTimeout(() => {
          setCountry("");
          setCity("");
          setDistrict("");
        }, 200);
      }
    },
    [onOpenChange],
  );

  const handleCountryChange = useCallback((value: string) => {
    setCountry(value);
    setCity("");
    setDistrict("");
  }, []);

  const handleCityChange = useCallback((value: string) => {
    setCity(value);
    setDistrict("");
  }, []);

  // Мемоизация списков для Select
  const countryOptions = useMemo(
    () =>
      Object.entries(locationData).map(([key, data]) => (
        <SelectItem key={key} value={key}>
          {data.name}
        </SelectItem>
      )),
    [],
  );

  const cityOptions = useMemo(
    () =>
      selectedCountryData
        ? Object.entries(selectedCountryData.cities).map(([key, cityData]) => (
            <SelectItem key={key} value={key}>
              {cityData.name}
            </SelectItem>
          ))
        : null,
    [selectedCountryData],
  );

  const districtOptions = useMemo(
    () =>
      selectedCityData?.districts.map((dist) => (
        <SelectItem key={dist} value={dist}>
          {dist}
        </SelectItem>
      )),
    [selectedCityData],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
                <SelectContent>{countryOptions}</SelectContent>
              </Select>
            </Field>

            <Field>
              <Select value={city} onValueChange={handleCityChange} disabled={!country}>
                <SelectTrigger>
                  <SelectValue placeholder="Город" />
                </SelectTrigger>
                <SelectContent>{cityOptions}</SelectContent>
              </Select>
            </Field>

            <Field>
              <Select value={district} onValueChange={setDistrict} disabled={!city}>
                <SelectTrigger>
                  <SelectValue placeholder="Район" />
                </SelectTrigger>
                <SelectContent>{districtOptions}</SelectContent>
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
